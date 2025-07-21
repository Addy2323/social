<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>@yield('title', 'School Management System')</title>

    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js" defer></script>
    @livewireStyles
</head>
<body class="bg-gray-100">
    {{-- Admin Layout with Sidebar --}}
    @if (auth()->check() && auth()->user()->isAdmin() && (request()->is('admin/*') || request()->is('admin')))
        <div class="flex min-h-screen">
            <!-- Sidebar -->
            <aside class="w-64 bg-white shadow-lg flex-shrink-0 h-screen sticky top-0">
                @include('partials.admin-sidebar')
            </aside>

            <!-- Main content -->
            <main class="flex-1 bg-gray-50 p-6">
                @if(session('success'))
                    <div class="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                        <span class="block sm:inline">{{ session('success') }}</span>
                    </div>
                @endif

                @if(session('error'))
                    <div class="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <span class="block sm:inline">{{ session('error') }}</span>
                    </div>
                @endif
                
                @yield('content')
            </main>
        </div>
    @else
    {{-- Default Layout for other users --}}
        <nav class="bg-blue-600 shadow-lg">
            <div class="max-w-7xl mx-auto px-4">
                <div class="flex justify-between h-16">
                    <div class="flex items-center">
                        <a href="{{ route('dashboard') }}" class="text-white text-xl font-bold">
                            <i class="fas fa-graduation-cap mr-2"></i>
                            School Management System
                        </a>
                    </div>
                    
                    @auth
                    <div class="flex items-center space-x-4">
                        <div class="text-white">
                            <span class="text-sm">{{ auth()->user()->role }}</span> |
                            <span class="font-medium">{{ auth()->user()->name }}</span>
                        </div>
                        
                        <!-- Role-based Navigation -->
                        @if(auth()->user()->isTeacher())
                            <a href="{{ route('teacher.dashboard') }}" class="text-white hover:text-blue-200">
                                <i class="fas fa-tachometer-alt mr-1"></i> Dashboard
                            </a>
                        @elseif(auth()->user()->isStudent())
                            <a href="{{ route('student.dashboard') }}" class="text-white hover:text-blue-200">
                                <i class="fas fa-tachometer-alt mr-1"></i> Dashboard
                            </a>
                        @elseif(auth()->user()->isParent())
                            <a href="{{ route('parent.dashboard') }}" class="text-white hover:text-blue-200">
                                <i class="fas fa-tachometer-alt mr-1"></i> Dashboard
                            </a>
                        @endif
                        
                        <form method="POST" action="{{ route('logout') }}" class="inline">
                            @csrf
                            <button type="submit" class="text-white hover:text-blue-200">
                                <i class="fas fa-sign-out-alt mr-1"></i> Logout
                            </button>
                        </form>
                    </div>
                    @else
                    <div class="flex items-center space-x-4">
                        <a href="{{ route('login') }}" class="text-white hover:text-blue-200">Login</a>
                        <a href="{{ route('register') }}" class="text-white hover:text-blue-200">Register</a>
                    </div>
                    @endauth
                </div>
            </div>
        </nav>

        <main class="py-6">
            @if(session('success'))
                <div class="max-w-7xl mx-auto px-4 mb-4">
                    <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                        {{ session('success') }}
                    </div>
                </div>
            @endif

            @if(session('error'))
                <div class="max-w-7xl mx-auto px-4 mb-4">
                    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        {{ session('error') }}
                    </div>
                </div>
            @endif

            @yield('content')
        </main>
    @endif

    @livewireScripts
    @include('sweetalert::alert')
</body>
</html>
