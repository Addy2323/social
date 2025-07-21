<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\PaymentIntent;
use Stripe\Exception\CardException;
use Stripe\Exception\InvalidRequestException;
use PayPalCheckoutSdk\Core\PayPalHttpClient;
use PayPalCheckoutSdk\Core\SandboxEnvironment;
use PayPalCheckoutSdk\Core\ProductionEnvironment;
use PayPalCheckoutSdk\Orders\OrdersCaptureRequest;
use PayPalCheckoutSdk\Orders\OrdersGetRequest;

class PaymentController extends Controller
{
    public function showPaymentForm()
    {
        return view('payment.form');
    }

    public function processPayment(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric|min:1',
            'payment_method_id' => 'required|string',
        ]);

        // Set your secret key. Remember to switch to your live secret key in production!
        Stripe::setApiKey(config('services.stripe.secret'));

        try {
            // Create a PaymentIntent with the order amount and currency
            $paymentIntent = \Stripe\PaymentIntent::create([
                'amount' => $request->amount * 100, // Convert to cents
                'currency' => 'usd',
                'payment_method' => $request->payment_method_id,
                'confirm' => true,
                'confirmation_method' => 'manual',
                'return_url' => route('payment.success'),
                'description' => 'Test payment',
            ]);

            // Payment succeeded
            return redirect()->route('payment.success')
                ->with('success', 'Payment successful! Thank you for your purchase.');

        } catch (CardException $e) {
            // Since it's a decline, \Stripe\Exception\CardException will be caught
            return back()->withErrors(['error' => $e->getError()->message]);
        } catch (InvalidRequestException $e) {
            // Invalid parameters were supplied to Stripe's API
            return back()->withErrors(['error' => 'Invalid payment details. Please try again.']);
        } catch (\Exception $e) {
            // Something else happened, completely unrelated to Stripe
            return back()->withErrors(['error' => 'An error occurred. Please try again.']);
        }
    }

    public function success(Request $request)
    {
        // Handle PayPal success callback
        if ($request->has('payment_method') && $request->payment_method === 'paypal') {
            $paymentId = $request->payment_id;
            
            try {
                $client = $this->getPayPalClient();
                $response = $client->execute(new OrdersGetRequest($paymentId));
                
                if ($response->statusCode === 200 && $response->result->status === 'COMPLETED') {
                    return view('payment.success', [
                        'payment_method' => 'PayPal',
                        'payment_id' => $paymentId,
                        'amount' => $response->result->purchase_units[0]->amount->value,
                        'payer_email' => $response->result->payer->email_address
                    ]);
                }
            } catch (\Exception $e) {
                return redirect()->route('payment.form')
                    ->with('error', 'There was an error processing your PayPal payment.');
            }
        }
        
        // Handle Stripe success
        if (!session('success')) {
            return redirect()->route('payment.form');
        }
        
        return view('payment.success', [
            'payment_method' => 'Credit Card',
            'payment_id' => session('payment_id'),
            'amount' => session('amount')
        ]);
    }
}
