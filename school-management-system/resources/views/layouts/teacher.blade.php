<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title', 'School Management') - Teacher</title>
    
    <!-- Favicon -->
    <link rel="shortcut icon" href="{{ asset('favicon.ico') }}">
    
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <!-- Scripts and CSS -->
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="bg-gray-100">
    <div class="min-h-screen flex">
        <!-- Sidebar -->
        @include('partials.teacher-sidebar')
        
        <!-- Main Content -->
        <div class="flex-1 flex flex-col overflow-hidden">
            <!-- Top Navigation -->
            <header class="bg-white shadow-sm">
                <div class="flex items-center justify-between px-6 py-4">
                    <!-- Mobile menu button -->
                    <div class="lg:hidden">
                        <button @click="sidebarOpen = !sidebarOpen" class="text-gray-500 hover:text-gray-600 focus:outline-none">
                            <i class="fas fa-bars text-xl"></i>
                        </button>
                    </div>
                    
                    <!-- Page Title -->
                    <h1 class="text-xl font-semibold text-gray-800">@yield('page-title', 'Dashboard')</h1>
                    
                    <!-- Right side icons -->
                    <div class="flex items-center space-x-4">
                        <!-- Notifications -->
                        <div class="relative">
                            <button class="p-1 text-gray-500 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500">
                                <i class="fas fa-bell text-xl"></i>
                            </button>
                            <span class="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                        </div>
                        
                        <!-- User dropdown -->
                        <div class="relative ml-4" x-data="{ open: false }">
                            <button @click="open = !open" class="flex items-center max-w-xs text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500" id="user-menu">
                                <div class="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white font-semibold">
                                    {{ strtoupper(substr(Auth::user()->name, 0, 1)) }}
                                </div>
                                <span class="hidden md:inline-block ml-2 text-sm font-medium text-gray-700">{{ Auth::user()->name }}</span>
                                <i class="fas fa-chevron-down ml-1 text-gray-500 text-xs"></i>
                            </button>
                            
                            <!-- Dropdown menu -->
                            <div x-show="open" 
                                 @click.away="open = false"
                                 x-transition:enter="transition ease-out duration-100"
                                 x-transition:enter-start="transform opacity-0 scale-95"
                                 x-transition:enter-end="transform opacity-100 scale-100"
                                 x-transition:leave="transition ease-in duration-75"
                                 x-transition:leave-start="transform opacity-100 scale-100"
                                 x-transition:leave-end="transform opacity-0 scale-95"
                                 class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                                <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                                        <i class="fas fa-user mr-2"></i> Your Profile
                                    </a>
                                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                                        <i class="fas fa-cog mr-2"></i> Settings
                                    </a>
                                    <form method="POST" action="{{ route('logout') }}">
                                        @csrf
                                        <button type="submit" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                                            <i class="fas fa-sign-out-alt mr-2"></i> Sign out
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            
            <!-- Page Content -->
            <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                @yield('content')
            </main>
            
            <!-- Footer -->
            <footer class="bg-white border-t border-gray-200 py-4 px-6">
                <div class="flex items-center justify-between">
                    <p class="text-sm text-gray-600">&copy; {{ date('Y') }} School Management System. All rights reserved.</p>
                </div>
            </footer>
        </div>
    </div>
    
    <!-- Alpine.js -->
    <script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.8.2/dist/alpine.min.js" defer></script>

    @stack('scripts')
    
    @stack('modals')
</body>
</html>
