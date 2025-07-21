<!DOCTYPE html>
<html>
<head>
    <title>Payment Successful</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="bg-gray-100">
    <div class="min-h-screen flex items-center justify-center p-4">
        <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <div class="text-green-500 mb-4">
                <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
            </div>
            
            <h1 class="text-2xl font-bold text-gray-800 mb-6 text-center">Payment Successful!</h1>
            
            <div class="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div class="flex justify-between py-2">
                    <span class="text-gray-600">Payment Method:</span>
                    <span class="font-medium">{{ $payment_method ?? 'Credit Card' }}</span>
                </div>
                
                @if(isset($amount))
                <div class="flex justify-between py-2 border-t border-green-100">
                    <span class="text-gray-600">Amount:</span>
                    <span class="font-medium">${{ number_format($amount, 2) }} USD</span>
                </div>
                @endif
                
                @if(isset($payment_id))
                <div class="flex justify-between py-2 border-t border-green-100">
                    <span class="text-gray-600">Transaction ID:</span>
                    <span class="font-mono text-sm text-gray-700">{{ $payment_id }}</span>
                </div>
                @endif
                
                @if(isset($payer_email))
                <div class="flex justify-between py-2 border-t border-green-100">
                    <span class="text-gray-600">Payer Email:</span>
                    <span class="text-blue-600">{{ $payer_email }}</span>
                </div>
                @endif
            </div>
            
            <p class="text-gray-600 mb-6 text-center">
                Thank you for your purchase. Your payment has been processed successfully.
                @if(session('success'))
                    <br><span class="text-green-600">{{ session('success') }}</span>
                @endif
            </p>
            
            <div class="flex flex-col space-y-3">
                <a href="{{ route('payment.form') }}" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded text-center transition duration-200">
                    Make Another Payment
                </a>
                <a href="/" class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded text-center transition duration-200">
                    Return to Home
                </a>
            </div>
        </div>
    </div>
</body>
</html>
