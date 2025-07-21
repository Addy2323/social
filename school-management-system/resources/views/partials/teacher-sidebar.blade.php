<div class="flex flex-col h-full bg-gray-800 text-gray-200 w-64 flex-shrink-0">
    <!-- Logo -->
    <div class="flex items-center justify-center h-16 bg-gray-900">
        <div class="flex items-center">
            <i class="fas fa-graduation-cap text-2xl text-teal-400 mr-2"></i>
            <span class="text-xl font-bold text-white">SchoolMS</span>
        </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 overflow-y-auto py-4">
        <div class="px-4 space-y-1">
            <!-- Dashboard -->
            <a href="{{ route('teacher.dashboard') }}" class="flex items-center px-4 py-3 text-sm font-medium rounded-lg {{ request()->is('teacher/dashboard*') ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white' }}">
                <i class="fas fa-tachometer-alt mr-3"></i>
                Dashboard
            </a>

            <!-- My Classes -->
            <a href="{{ route('teacher.classes.index') }}" class="flex items-center px-4 py-3 text-sm font-medium rounded-lg {{ request()->is('teacher/classes*') ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white' }}">
                <i class="fas fa-chalkboard-teacher mr-3"></i>
                My Classes
            </a>

            <!-- Students -->
            <a href="#" class="flex items-center px-4 py-3 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white">
                <i class="fas fa-users mr-3"></i>
                Students
            </a>

            <!-- Attendance -->
            <a href="#" class="flex items-center px-4 py-3 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white">
                <i class="fas fa-clipboard-check mr-3"></i>
                Attendance
            </a>

            <!-- Assignments -->
            <a href="#" class="flex items-center px-4 py-3 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white">
                <i class="fas fa-tasks mr-3"></i>
                Assignments
            </a>

            <!-- Grades -->
            <a href="#" class="flex items-center px-4 py-3 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white">
                <i class="fas fa-star mr-3"></i>
                Grades
            </a>

            <!-- Messages -->
            <a href="#" class="flex items-center px-4 py-3 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white">
                <i class="fas fa-envelope mr-3"></i>
                Messages
                <span class="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">3</span>
            </a>

            <!-- Calendar -->
            <a href="#" class="flex items-center px-4 py-3 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white">
                <i class="far fa-calendar-alt mr-3"></i>
                Calendar
            </a>
        </div>
    </nav>

    <!-- User Profile -->
    <div class="p-4 border-t border-gray-700">
        <div class="flex items-center">
            <div class="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center text-white font-semibold">
                {{ strtoupper(substr(Auth::user()->name, 0, 1)) }}
            </div>
            <div class="ml-3">
                <p class="text-sm font-medium text-white">{{ Auth::user()->name }}</p>
                <p class="text-xs text-gray-400">Teacher</p>
            </div>
        </div>
        <div class="mt-3">
            <form method="POST" action="{{ route('logout') }}">
                @csrf
                <button type="submit" class="w-full flex items-center justify-center px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg">
                    <i class="fas fa-sign-out-alt mr-2"></i> Sign out
                </button>
            </form>
        </div>
    </div>
</div>
