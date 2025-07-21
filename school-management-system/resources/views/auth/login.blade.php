<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Login - School Management System</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
</head>
<body class="min-h-screen" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
    <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full">
            <div class="bg-white rounded-2xl shadow-2xl p-8">
                <!-- Header -->
                <div class="text-center mb-8">
                    <div class="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <i class="fas fa-graduation-cap text-2xl text-gray-600"></i>
                    </div>
                    <h1 class="text-2xl font-bold text-gray-900 mb-2">School Management System</h1>
                    <p class="text-gray-500 text-sm">Sign in to your account</p>
                </div>

                <!-- Form -->
                <form method="POST" action="{{ route('login') }}" class="space-y-6">
                    @csrf
                    
                    <!-- Email Field -->
                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email/Username/registation number</label>
                        <input id="email" name="email" type="email" autocomplete="email" required 
                               class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 @error('email') border-red-500 @enderror" 
                               placeholder="Enter your email" value="">
                        @error('email')
                            <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                        @enderror
                    </div>

                    <!-- Password Field -->
                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <input id="password" name="password" type="password" autocomplete="current-password" required 
                               class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 @error('password') border-red-500 @enderror" 
                               placeholder="Enter your password" value="">
                        @error('password')
                            <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                        @enderror
                    </div>

                    <!-- Sign In Button -->
                    <button type="submit" 
                            class="w-full bg-gray-900 text-white py-3 px-4 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-200 font-medium">
                        Sign In
                    </button>
                </form>

                <!-- Demo Accounts -->
                <div class="mt-8 p-4 bg-gray-50 rounded-lg">
                    <h3 class="text-sm font-medium text-gray-700 mb-3">Demo Accounts:</h3>
                    <div class="space-y-1 text-xs text-gray-600">
                        <div><span class="font-medium text-gray-800">Admin:</span> admin@school.com</div>
                        <div><span class="font-medium text-gray-800">Teacher:</span> john.smith@school.com</div>
                        <div><span class="font-medium text-gray-800">Student:</span> alice.wilson@school.com</div>
                        <div><span class="font-medium text-gray-800">Parent:</span> robert.wilson@email.com</div>
                        <div class="mt-2 pt-2 border-t border-gray-200">
                            <span class="font-medium text-gray-800">Password:</span> password
                        </div>
                    </div>
                </div>

                <!-- Register Link -->
                <div class="mt-6 text-center">
                    <p class="text-sm text-gray-600">
                        Don't have an account? 
                        <a href="{{ route('register') }}" class="font-medium text-blue-600 hover:text-blue-500">
                            Register here
                        </a>
                    </p>
                </div>
            </div>
        </div>
    </div>

    <!-- Quick Login Buttons for Demo -->
    <script>
        // Pre-fill demo credentials when clicking on demo accounts
        document.addEventListener('DOMContentLoaded', function() {
            const emailInput = document.getElementById('email');
            const passwordInput = document.getElementById('password');
            
            // Quick login function
            window.quickLogin = function(email) {
                emailInput.value = email;
                passwordInput.value = 'password';
            }
        });
    </script>
</body>
</html>
