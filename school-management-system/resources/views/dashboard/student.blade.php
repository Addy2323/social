<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Student Dashboard - School Management System</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
</head>
<body class="bg-gray-50">
    <div class="flex h-screen">
        <!-- Sidebar -->
        <div class="w-64 bg-white shadow-lg">
            <!-- Logo -->
            <div class="p-6 border-b border-gray-200">
                <div class="flex items-center">
                    <div class="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center mr-3">
                        <i class="fas fa-graduation-cap text-white text-sm"></i>
                    </div>
                    <div>
                        <h1 class="text-lg font-bold text-gray-900">School MS</h1>
                        <p class="text-sm text-gray-500">Student Panel</p>
                    </div>
                </div>
            </div>

            <!-- Navigation -->
            <nav class="p-4 space-y-2">
                <a href="{{ route('student.dashboard') }}" class="flex items-center px-4 py-3 text-white bg-gray-900 rounded-lg">
                    <i class="fas fa-home w-5 mr-3"></i>
                    <span class="font-medium">Dashboard</span>
                </a>
                <a href="#" class="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <i class="fas fa-door-open w-5 mr-3"></i>
                    <span>My Classes</span>
                </a>
                <a href="#" class="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <i class="fas fa-calendar-alt w-5 mr-3"></i>
                    <span>Timetable</span>
                </a>
                <a href="#" class="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <i class="fas fa-bell w-5 mr-3"></i>
                    <span>Announcements</span>
                </a>
            </nav>

            <!-- User Profile -->
            <div class="absolute bottom-0 w-64 p-4 border-t border-gray-200">
                <div class="flex items-center">
                    <div class="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center">
                        <span class="text-white font-medium">{{ substr(auth()->user()->name, 0, 1) }}</span>
                    </div>
                    <div class="ml-3 flex-1">
                        <p class="text-sm font-medium text-gray-900">{{ auth()->user()->name }}</p>
                        <p class="text-xs text-gray-500">{{ auth()->user()->email }}</p>
                    </div>
                </div>
                <form method="POST" action="{{ route('logout') }}" class="mt-3">
                    @csrf
                    <button type="submit" class="flex items-center w-full px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <i class="fas fa-sign-out-alt w-4 mr-2"></i>
                        <span>Logout</span>
                    </button>
                </form>
            </div>
        </div>

        <!-- Main Content -->
        <div class="flex-1 overflow-auto">
            <!-- Header -->
            <div class="bg-white border-b border-gray-200 px-6 py-4">
                <h1 class="text-2xl font-bold text-gray-900">Student Dashboard</h1>
                <p class="text-gray-600 mt-1">Welcome back, {{ auth()->user()->name }}!</p>
            </div>

            <!-- Content -->
            <div class="p-6">
                <!-- Statistics Cards -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <!-- My Subjects -->
                    <div class="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm font-medium text-gray-500">My Subjects</p>
                                <p class="text-2xl font-bold text-gray-900 mt-1">8</p>
                                <p class="text-sm text-gray-500 mt-1">0% from last month</p>
                            </div>
                            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <i class="fas fa-book text-blue-600 text-lg"></i>
                            </div>
                        </div>
                    </div>

                    <!-- Attendance -->
                    <div class="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm font-medium text-gray-500">Attendance</p>
                                <p class="text-2xl font-bold text-gray-900 mt-1">{{ $attendanceStats['percentage'] }}%</p>
                                <p class="text-sm text-green-600 mt-1">+1% from last month</p>
                            </div>
                            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <i class="fas fa-calendar-check text-green-600 text-lg"></i>
                            </div>
                        </div>
                    </div>

                    <!-- Average Grade -->
                    <div class="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm font-medium text-gray-500">Average Grade</p>
                                <p class="text-2xl font-bold text-gray-900 mt-1">A-</p>
                                <p class="text-sm text-green-600 mt-1">+0.2 from last month</p>
                            </div>
                            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                <i class="fas fa-chart-line text-purple-600 text-lg"></i>
                            </div>
                        </div>
                    </div>

                    <!-- Assignments Due -->
                    <div class="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm font-medium text-gray-500">Assignments Due</p>
                                <p class="text-2xl font-bold text-gray-900 mt-1">3</p>
                                <p class="text-sm text-orange-600 mt-1">-2 from last month</p>
                            </div>
                            <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                <i class="fas fa-tasks text-orange-600 text-lg"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Recent Activity & Quick Actions -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <!-- Recent Activity -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                        <div class="p-6 border-b border-gray-200">
                            <h3 class="text-lg font-semibold text-gray-900">Recent Activity</h3>
                            <p class="text-sm text-gray-500 mt-1">Latest updates from your school</p>
                        </div>
                        <div class="p-6">
                            <div class="space-y-4">
                                <div class="flex items-start">
                                    <div class="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                                    <div class="flex-1">
                                        <p class="text-sm text-gray-900">New student enrollment completed</p>
                                        <p class="text-xs text-gray-500 mt-1">2h ago</p>
                                    </div>
                                </div>
                                <div class="flex items-start">
                                    <div class="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                                    <div class="flex-1">
                                        <p class="text-sm text-gray-900">Monthly fee payment received</p>
                                        <p class="text-xs text-gray-500 mt-1">4h ago</p>
                                    </div>
                                </div>
                                <div class="flex items-start">
                                    <div class="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3"></div>
                                    <div class="flex-1">
                                        <p class="text-sm text-gray-900">New announcement published</p>
                                        <p class="text-xs text-gray-500 mt-1">1d ago</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Quick Actions -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                        <div class="p-6 border-b border-gray-200">
                            <h3 class="text-lg font-semibold text-gray-900">Quick Actions</h3>
                            <p class="text-sm text-gray-500 mt-1">Frequently used features</p>
                        </div>
                        <div class="p-6">
                            <div class="space-y-3">
                                <a href="#" class="flex items-center justify-between p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                                    <span class="text-blue-700 font-medium">View Timetable</span>
                                    <i class="fas fa-arrow-right text-blue-500"></i>
                                </a>
                                <a href="{{ route('student.grades') }}" class="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                                    <span class="text-gray-700 font-medium">Check Grades</span>
                                    <i class="fas fa-arrow-right text-gray-500"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Welcome Message (like in your design) -->
                @if(session('success'))
                <div class="fixed bottom-6 right-6 bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-sm">
                    <h4 class="font-medium text-gray-900">Welcome back!</h4>
                    <p class="text-sm text-gray-500 mt-1">You have successfully logged in.</p>
                </div>
                @endif
            </div>
        </div>
    </div>
</body>
</html>
