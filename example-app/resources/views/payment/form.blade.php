<!DOCTYPE html>
<html>
<head>
    <title>Payment Form</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <script src="https://js.stripe.com/v3/"></script>
</head>
<body class="bg-gray-100">
    <div class="container mx-auto px-4 py-8">
        <div class="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
            <h1 class="text-2xl font-bold mb-6 text-center">Make a Payment</h1>
            
            @if(session('success'))
                <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                    {{ session('success') }}
                </div>
            @endif

            @if($errors->any())
                <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {{ $errors->first() }}
                </div>
            @endif

            <form action="{{ route('payment.process') }}" method="POST" id="payment-form" class="space-y-4">
                @csrf
                <div>
                    <label for="amount" class="block text-sm font-medium text-gray-700">Amount (USD)</label>
                    <input type="number" id="amount" name="amount" min="1" step="0.01" required 
                           class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                </div>

                <div id="card-element" class="p-3 border rounded">
                    <!-- A Stripe Element will be inserted here. -->
                </div>

                <!-- Used to display form errors. -->
                <div id="card-errors" role="alert" class="text-red-500 text-sm"></div>

                <button type="submit" id="submit-button" 
                        class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4">
                    Pay with Card
                </button>

                <div class="border-t border-gray-300 my-6">
                    <p class="text-center text-gray-500 text-sm my-4">- OR -</p>
                </div>

                <!-- PayPal Button Container with Styling and Debug -->
                <div class="border rounded-lg p-4 bg-gray-50">
                    <div class="flex items-center justify-between mb-3">
                        <div class="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 text-blue-600 mr-2">
                                <path d="M14 9c0 2.5 2 3 2 4 0 1-1 2-3 2s-3-1-4-2-2-2-2-4 2-4 5-4 5 2 5 4c0 3-2 9-5 9s-4-3-3-9"></path>
                            </svg>
                            <span class="font-medium text-gray-700">Pay with PayPal</span>
                        </div>
                        <span id="paypal-status" class="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800">Loading...</span>
                    </div>
                    <div id="paypal-button-container" class="w-full min-h-[50px] bg-gray-100 rounded flex items-center justify-center">
                        <div class="text-center p-4">
                            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
                            <p class="text-sm text-gray-600">Loading PayPal...</p>
                        </div>
                    </div>
                    <div id="paypal-debug" class="mt-2 text-xs text-gray-500 hidden"></div>
                </div>
            </form>
        </div>
    </div>

    <!-- PayPal SDK with Debug Mode -->
    <script src="https://www.paypal.com/sdk/js?client-id={{ config('services.paypal.client_id', 'test') }}&currency=USD&debug=true" data-sdk-integration-source="button-factory"></script>
    <script>
        // Debug function
        function updatePayPalStatus(message, type = 'info') {
            const statusEl = document.getElementById('paypal-status');
            const debugEl = document.getElementById('paypal-debug');
            
            if (statusEl) {
                statusEl.textContent = message;
                statusEl.className = `text-xs px-2 py-1 rounded-full ${
                    type === 'error' ? 'bg-red-100 text-red-800' : 
                    type === 'success' ? 'bg-green-100 text-green-800' : 
                    'bg-yellow-100 text-yellow-800'
                }`;
            }
            
            if (debugEl) {
                const timestamp = new Date().toLocaleTimeString();
                debugEl.innerHTML += `[${timestamp}] ${message}<br>`;
                debugEl.classList.remove('hidden');
                debugEl.scrollTop = debugEl.scrollHeight;
            }
            
            console.log(`[PayPal ${type.toUpperCase()}]`, message);
        }
        
        // Check if PayPal SDK loaded correctly
        document.addEventListener('DOMContentLoaded', function() {
            const debugEl = document.getElementById('paypal-debug');
            if (debugEl) {
                debugEl.innerHTML = ''; // Clear any previous debug messages
            }
            
            if (typeof paypal === 'undefined') {
                const errorMsg = 'PayPal SDK failed to load. Please check your internet connection and try again.';
                updatePayPalStatus('SDK Error', 'error');
                
                const container = document.getElementById('paypal-button-container');
                if (container) {
                    container.innerHTML = `
                        <div class="bg-red-50 border-l-4 border-red-400 p-4">
                            <div class="flex">
                                <div class="flex-shrink-0">
                                    <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <div class="ml-3">
                                    <p class="text-sm text-red-700">
                                        ${errorMsg}
                                    </p>
                                </div>
                            </div>
                        </div>
                    `;
                }
                return;
            }
            
            updatePayPalStatus('SDK Loaded', 'success');
        });
    </script>
    
    <script>
        // Create a Stripe client.
        var stripe = Stripe('{{ config('services.stripe.key') }}');
        
        // Create an instance of Elements for Stripe
        var elements = stripe.elements();
        
        // Initialize PayPal Button if container exists
        const paypalContainer = document.getElementById('paypal-button-container');
        if (paypalContainer && typeof paypal !== 'undefined') {
            updatePayPalStatus('Initializing PayPal button...');
            
            try {
                const buttons = paypal.Buttons({
                    style: {
                        layout: 'vertical',
                        color: 'gold',
                        shape: 'rect',
                        label: 'paypal',
                        height: 45,
                        tagline: false,
                        fundingicons: false,
                        branding: true
                    },
                    
                    // Set up the transaction
                    createOrder: function(data, actions) {
                        updatePayPalStatus('Creating order...');
                        const amount = document.getElementById('amount').value;
                        
                        if (!amount || amount < 1) {
                            const errorMsg = 'Please enter a valid amount (minimum $1)';
                            updatePayPalStatus(errorMsg, 'error');
                            throw new Error(errorMsg);
                        }
                        
                        updatePayPalStatus(`Creating order for $${amount}...`);
                        
                        return actions.order.create({
                            purchase_units: [{
                                amount: {
                                    value: amount,
                                    currency_code: 'USD',
                                    breakdown: {
                                        item_total: {
                                            currency_code: 'USD',
                                            value: amount
                                        }
                                    }
                                },
                                items: [{
                                    name: 'Payment for services',
                                    description: 'Payment for services',
                                    quantity: '1',
                                    unit_amount: {
                                        currency_code: 'USD',
                                        value: amount
                                    },
                                    category: 'DIGITAL_GOODS'
                                }]
                            }],
                            application_context: {
                                shipping_preference: 'NO_SHIPPING',
                                brand_name: '{{ config('app.name') }}',
                                user_action: 'PAY_NOW'
                            }
                        }).then(function(orderId) {
                            updatePayPalStatus(`Order created: ${orderId}`, 'success');
                            return orderId;
                        }).catch(function(error) {
                            updatePayPalStatus(`Order creation failed: ${error.message}`, 'error');
                            throw error;
                        });
                    },
                    
                    onApprove: function(data, actions) {
                        updatePayPalStatus('Processing payment...');
                        
                        return actions.order.capture().then(function(details) {
                            updatePayPalStatus('Payment successful! Redirecting...', 'success');
                            window.location.href = '{{ route("payment.success") }}?payment_method=paypal&payment_id=' + data.orderID;
                        }).catch(function(error) {
                            updatePayPalStatus(`Payment capture failed: ${error.message}`, 'error');
                            console.error('PayPal Capture Error:', error);
                        });
                    },
                    
                    onError: function(err) {
                        const errorMsg = `PayPal Error: ${err.message || 'Unknown error occurred'}`;
                        updatePayPalStatus(errorMsg, 'error');
                        console.error('PayPal Error:', err);
                    },
                    
                    onClick: function() {
                        updatePayPalStatus('Button clicked, processing...');
                        const amount = document.getElementById('amount').value;
                        if (!amount || amount < 1) {
                            updatePayPalStatus('Please enter a valid amount first', 'error');
                            return false;
                        }
                    },
                    
                    onCancel: function(data) {
                        updatePayPalStatus('Payment was cancelled', 'info');
                    }
                });
                
                if (buttons.isEligible()) {
                    buttons.render('#paypal-button-container')
                        .then(() => {
                            updatePayPalStatus('PayPal button ready', 'success');
                            const loadingEl = paypalContainer.querySelector('div.text-center');
                            if (loadingEl) {
                                loadingEl.style.display = 'none';
                            }
                        })
                        .catch(error => {
                            updatePayPalStatus(`Failed to render button: ${error.message}`, 'error');
                            console.error('Button render error:', error);
                        });
                } else {
                    updatePayPalStatus('PayPal button not eligible', 'error');
                    paypalContainer.innerHTML = `
                        <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                            <div class="flex">
                                <div class="flex-shrink-0">
                                    <svg class="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <div class="ml-3">
                                    <p class="text-sm text-yellow-700">
                                        PayPal payment is not available in your region or with your current settings.
                                    </p>
                                </div>
                            </div>
                        </div>
                    `;
                }
            } catch (error) {
                updatePayPalStatus(`Initialization error: ${error.message}`, 'error');
                console.error('PayPal Initialization Error:', error);
            }
        } else if (paypalContainer) {
            updatePayPalStatus('PayPal SDK not loaded', 'error');
        }
        
        // Custom styling can be passed to options when creating an Element.
        var style = {
            base: {
                color: '#32325d',
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSmoothing: 'antialiased',
                fontSize: '16px',
                '::placeholder': {
                    color: '#aab7c4'
                }
            },
            invalid: {
                color: '#fa755a',
                iconColor: '#fa755a'
            }
        };
        
        // Create an instance of the card Element.
        var card = elements.create('card', {style: style});
        
        // Add an instance of the card Element into the `card-element` <div>.
        card.mount('#card-element');
        
        // Handle real-time validation errors from the card Element.
        card.on('change', function(event) {
            var displayError = document.getElementById('card-errors');
            if (event.error) {
                displayError.textContent = event.error.message;
            } else {
                displayError.textContent = '';
            }
        });
        
        // Handle form submission.
        var form = document.getElementById('payment-form');
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Disable the submit button to prevent repeated clicks
            document.getElementById('submit-button').disabled = true;
            
            // Create payment method and submit the form
            stripe.createPaymentMethod({
                type: 'card',
                card: card,
                billing_details: {
                    // Add any additional billing details here
                }
            }).then(function(result) {
                if (result.error) {
                    // Show error to your customer
                    var errorElement = document.getElementById('card-errors');
                    errorElement.textContent = result.error.message;
                    document.getElementById('submit-button').disabled = false;
                } else {
                    // Add the payment method ID to the form and submit
                    var hiddenInput = document.createElement('input');
                    hiddenInput.setAttribute('type', 'hidden');
                    hiddenInput.setAttribute('name', 'payment_method_id');
                    hiddenInput.setAttribute('value', result.paymentMethod.id);
                    form.appendChild(hiddenInput);
                    
                    // Submit the form
                    form.submit();
                }
            });
        });
    </script>
</body>
</html>
