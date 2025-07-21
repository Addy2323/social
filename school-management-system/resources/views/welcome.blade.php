<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>School Management System</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
</head>
<body class="bg-gray-100 min-h-screen flex items-center justify-center">
    <div class="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div class="mb-6">
            <i class="fas fa-graduation-cap text-6xl text-blue-600 mb-4"></i>
            <h1 class="text-3xl font-bold text-gray-900 mb-2">School Management System</h1>
            <p class="text-gray-600">Complete solution for managing students, teachers, parents, and academic records</p>
        </div>
        
        <div class="space-y-4">
            @auth
                <a href="{{ route('dashboard') }}" 
                   class="block w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition duration-150">
                    <i class="fas fa-tachometer-alt mr-2"></i>Go to Dashboard
                </a>
            @else
                <a href="{{ route('login') }}" 
                   class="block w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition duration-150">
                    <i class="fas fa-sign-in-alt mr-2"></i>Login
                </a>
                @if (Route::has('register'))
                    <a href="{{ route('register') }}" 
                       class="block w-full bg-gray-600 text-white py-3 px-4 rounded-md hover:bg-gray-700 transition duration-150">
                        <i class="fas fa-user-plus mr-2"></i>Register
                    </a>
                @endif
            @endauth
        </div>

        <div class="mt-8 text-sm text-gray-500">
            <p class="mb-2"><strong>Features:</strong></p>
            <ul class="text-left space-y-1">
                <li><i class="fas fa-check text-green-500 mr-2"></i>Student Management</li>
                <li><i class="fas fa-check text-green-500 mr-2"></i>Teacher Management</li>
                <li><i class="fas fa-check text-green-500 mr-2"></i>Parent Portal</li>
                <li><i class="fas fa-check text-green-500 mr-2"></i>Grade & Attendance Tracking</li>
                <li><i class="fas fa-check text-green-500 mr-2"></i>Class Management</li>
            </ul>
        </div>
        
        <div class="mt-6 text-xs text-gray-400">
            <p>Demo Credentials: admin@school.com / password</p>
        </div>
    </div>
</body>
</html>
