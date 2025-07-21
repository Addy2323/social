<div class="w-64 bg-white shadow-lg flex flex-col h-full">
    <!-- Logo -->
    <div class="p-6 border-b border-gray-200">
        <div class="flex items-center">
            <div class="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center mr-3">
                <i class="fas fa-graduation-cap text-white text-sm"></i>
            </div>
            <div>
                <h1 class="text-lg font-bold text-gray-900">School MS</h1>
                <p class="text-sm text-gray-500">Admin Panel</p>
            </div>
        </div>
    </div>

    <!-- Navigation -->
    <div class="relative flex-1 p-4">
        <div id="menu-indicator" class="absolute left-2 right-2 h-11 bg-gray-900 rounded-lg transition-all duration-300 ease-in-out" style="display: none;"></div>
        <nav class="relative space-y-1">
            <a href="{{ route('admin.dashboard') }}" 
               class="nav-item flex items-center px-4 py-3 rounded-lg transition-colors duration-200 z-10 {{ Request::routeIs('admin.dashboard') ? 'text-white' : 'text-gray-600 hover:text-gray-900' }}">
                <i class="fas fa-home w-5 h-5 mr-3 text-center"></i>
                <span class="font-medium">Dashboard</span>
            </a>
            
            <a href="{{ route('admin.students.index') }}" 
               class="nav-item flex items-center px-4 py-3 rounded-lg transition-colors duration-200 z-10 {{ Request::routeIs('admin.students.*') ? 'text-white' : 'text-gray-600 hover:text-gray-900' }}">
                <i class="fas fa-users w-5 h-5 mr-3 text-center"></i>
                <span class="font-medium">Students</span>
            </a>
            
            <a href="{{ route('admin.teachers.index') }}" 
               class="nav-item flex items-center px-4 py-3 rounded-lg transition-colors duration-200 z-10 {{ Request::routeIs('admin.teachers.*') ? 'text-white' : 'text-gray-600 hover:text-gray-900' }}">
                <i class="fas fa-chalkboard-teacher w-5 h-5 mr-3 text-center"></i>
                <span class="font-medium">Teachers</span>
            </a>
            
            <a href="{{ route('admin.parents.index') }}" 
               class="nav-item flex items-center px-4 py-3 rounded-lg transition-colors duration-200 z-10 {{ Request::routeIs('admin.parents.*') ? 'text-white' : 'text-gray-600 hover:text-gray-900' }}">
                <i class="fas fa-user-friends w-5 h-5 mr-3 text-center"></i>
                <span class="font-medium">Parents</span>
            </a>
            
            <a href="{{ route('admin.classes.index') }}" 
               class="nav-item flex items-center px-4 py-3 rounded-lg transition-colors duration-200 z-10 {{ Request::routeIs('admin.classes.*') ? 'text-white' : 'text-gray-600 hover:text-gray-900' }}">
                <i class="fas fa-door-open w-5 h-5 mr-3 text-center"></i>
                <span class="font-medium">Classes</span>
            </a>
            
            <a href="{{ route('admin.results.index') }}" 
               class="nav-item flex items-center px-4 py-3 rounded-lg transition-colors duration-200 z-10 {{ Request::routeIs('admin.results.*') ? 'text-white' : 'text-gray-600 hover:text-gray-900' }}">
                <i class="fas fa-poll w-5 h-5 mr-3 text-center"></i>
                <span class="font-medium">Results</span>
            </a>
            
            <a href="{{ route('admin.rankings.index') }}" 
               class="nav-item flex items-center px-4 py-3 rounded-lg transition-colors duration-200 z-10 {{ Request::routeIs('admin.rankings.*') ? 'text-white' : 'text-gray-600 hover:text-gray-900' }}">
                <i class="fas fa-trophy w-5 h-5 mr-3 text-center"></i>
                <span class="font-medium">Rankings</span>
            </a>
            
            <a href="{{ route('admin.attendance.index') }}" 
               class="nav-item flex items-center px-4 py-3 rounded-lg transition-colors duration-200 z-10 {{ Request::routeIs('admin.attendance.*') ? 'text-white' : 'text-gray-600 hover:text-gray-900' }}">
                <i class="fas fa-calendar-check w-5 h-5 mr-3 text-center"></i>
                <span class="font-medium">Attendance</span>
            </a>
            
            <a href="{{ route('admin.fees.index') }}" 
               class="nav-item flex items-center px-4 py-3 rounded-lg transition-colors duration-200 z-10 {{ Request::routeIs('admin.fees.*') ? 'text-white' : 'text-gray-600 hover:text-gray-900' }}">
                <i class="fas fa-dollar-sign w-5 h-5 mr-3 text-center"></i>
                <span class="font-medium">Fees</span>
            </a>
            
            <a href="{{ route('admin.payments.index') }}" 
               class="nav-item flex items-center px-4 py-3 rounded-lg transition-colors duration-200 z-10 {{ Request::routeIs('admin.payments.*') ? 'text-white' : 'text-gray-600 hover:text-gray-900' }}">
                <i class="fas fa-credit-card w-5 h-5 mr-3 text-center"></i>
                <span class="font-medium">Payments</span>
            </a>
            
            <a href="#" class="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-all duration-200 group">
                <i class="fas fa-file-invoice-dollar w-5 h-5 mr-3 text-center"></i>
                <span>Fee Structure</span>
            </a>
            
            <a href="{{ route('admin.announcements.index') }}" class="flex items-center px-4 py-3 rounded-lg group {{ request()->routeIs('admin.announcements.*') ? 'text-white bg-gray-900' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900' }}">
                <i class="fas fa-bullhorn w-5 h-5 mr-3 text-center"></i>
                <span>Announcements</span>
            </a>
            
            <a href="#" class="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-all duration-200 group">
                <i class="fas fa-comments w-5 h-5 mr-3 text-center"></i>
                <span>Messages</span>
            </a>
            
            <a href="#" class="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-all duration-200 group">
                <i class="fas fa-bell w-5 h-5 mr-3 text-center"></i>
                <span>Notifications</span>
            </a>
            
            <a href="#" class="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-all duration-200 group">
                <i class="fas fa-file-alt w-5 h-5 mr-3 text-center"></i>
                <span>Academic Reports</span>
            </a>
            
            <a href="#" class="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-all duration-200 group">
                <i class="fas fa-chart-bar w-5 h-5 mr-3 text-center"></i>
                <span>Analytics</span>
            </a>
            
            <a href="#" class="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-all duration-200 group">
                <i class="fas fa-download w-5 h-5 mr-3 text-center"></i>
                <span>Export Data</span>
            </a>
            
            <a href="#" class="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-all duration-200 group">
                <i class="fas fa-cog w-5 h-5 mr-3 text-center"></i>
                <span>Settings</span>
            </a>
        </nav>
    </div>

    <!-- User Profile -->
    <div class="p-4 border-t border-gray-200 bg-gray-50">
        <div class="flex items-center mb-3">
            <div class="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0">
                <span class="text-white font-medium text-sm">{{ substr(auth()->user()->name, 0, 1) }}</span>
            </div>
            <div class="ml-3 flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate">{{ auth()->user()->name }}</p>
                <p class="text-xs text-gray-500 truncate">{{ auth()->user()->email }}</p>
            </div>
        </div>
        <form method="POST" action="{{ route('logout') }}">
            @csrf
            <button type="submit" class="flex items-center w-full px-3 py-2 text-sm text-gray-600 hover:bg-gray-200 hover:text-gray-900 rounded-lg transition-all duration-200">
                <i class="fas fa-sign-out-alt w-4 h-4 mr-2"></i>
                <span>Logout</span>
            </button>
        </form>
    </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const indicator = document.getElementById('menu-indicator');
    const navItems = document.querySelectorAll('.nav-item');
    
    const activeItem = Array.from(navItems).find(item => item.classList.contains('text-white'));

    function setIndicatorPosition(element) {
        if (element && indicator) {
            indicator.style.top = `${element.offsetTop}px`;
            indicator.style.display = 'block';
        }
    }

    if (activeItem) {
        // Use setTimeout to ensure the element is fully rendered before getting its position
        setTimeout(() => setIndicatorPosition(activeItem), 50);
    }
});
</script>
