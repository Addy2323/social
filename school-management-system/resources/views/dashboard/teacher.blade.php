@extends('layouts.teacher')

@section('title', 'Dashboard')
@section('page-title', 'Dashboard')

@section('content')
    <!-- Welcome Header -->
    <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-800 dark:text-gray-200">Teacher Dashboard</h1>
        <p class="text-gray-600 dark:text-gray-400">Welcome back, {{ Auth::user()->name }}!</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <!-- Card 1: My Classes -->
        <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
            <div class="flex justify-between items-start">
                <div class="flex flex-col">
                    <p class="text-sm font-medium text-gray-500 dark:text-gray-400">My Classes</p>
                    <p class="text-3xl font-bold text-gray-800 dark:text-gray-100">{{ $myClassesCount }}</p>
                </div>
                <div class="bg-blue-100 text-blue-500 rounded-full w-12 h-12 flex items-center justify-center">
                    <i class="fas fa-chalkboard-teacher fa-lg"></i>
                </div>
            </div>
        </div>

        <!-- Card 2: Total Students -->
        <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
            <div class="flex justify-between items-start">
                <div class="flex flex-col">
                    <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Students</p>
                    <p class="text-3xl font-bold text-gray-800 dark:text-gray-100">{{ $totalStudentsCount }}</p>
                </div>
                <div class="bg-green-100 text-green-500 rounded-full w-12 h-12 flex items-center justify-center">
                    <i class="fas fa-users fa-lg"></i>
                </div>
            </div>
        </div>

        <!-- Card 3: Attendance Rate -->
        <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
            <div class="flex justify-between items-start">
                <div class="flex flex-col">
                    <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Attendance Rate</p>
                    <p class="text-3xl font-bold text-gray-800 dark:text-gray-100">{{ $attendanceRate }}%</p>
                </div>
                <div class="bg-purple-100 text-purple-500 rounded-full w-12 h-12 flex items-center justify-center">
                    <i class="fas fa-chart-line fa-lg"></i>
                </div>
            </div>
        </div>

        <!-- Card 4: Assignments -->
        <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
            <div class="flex justify-between items-start">
                <div class="flex flex-col">
                    <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Assignments</p>
                    <p class="text-3xl font-bold text-gray-800 dark:text-gray-100">{{ $assignmentsCount }}</p>
                </div>
                <div class="bg-orange-100 text-orange-500 rounded-full w-12 h-12 flex items-center justify-center">
                    <i class="fas fa-clipboard-list fa-lg"></i>
                </div>
            </div>
        </div>
    </div>

    <!-- Main Content Area -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left Column: Performance Chart -->
        <div class="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Class Performance</h2>
            <canvas id="performanceChart"></canvas>
        </div>

        <!-- Right Column: Quick Actions & Recent Activity -->
        <div class="space-y-8">
            <!-- Quick Actions -->
            <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Quick Actions</h2>
                <div class="space-y-4">
                    <a href="#" class="flex items-center p-4 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors">
                        <i class="fas fa-check-circle text-blue-500 mr-4"></i>
                        <span class="font-medium text-gray-700 dark:text-gray-300">Mark Attendance</span>
                    </a>
                    <a href="#" class="flex items-center p-4 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors">
                        <i class="fas fa-plus-circle text-green-500 mr-4"></i>
                        <span class="font-medium text-gray-700 dark:text-gray-300">Add Assignment</span>
                    </a>
                </div>
            </div>

            <!-- Recent Activity -->
            <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Recent Activity</h2>
                <ul class="space-y-4">
                    @forelse ($recentActivity as $activity)
                        <li class="flex items-start">
                            <div class="w-3 h-3 rounded-full mt-1.5 mr-4 flex-shrink-0 
                                @if($activity['type'] === 'student') bg-blue-500 @endif
                                @if($activity['type'] === 'payment') bg-green-500 @endif
                                @if($activity['type'] === 'announcement') bg-orange-500 @endif
                            "></div>
                            <div>
                                <p class="text-sm text-gray-800 dark:text-gray-300">{{ $activity['text'] }}</p>
                                <p class="text-xs text-gray-400 dark:text-gray-500">{{ $activity['time'] }}</p>
                            </div>
                        </li>
                    @empty
                        <li class="text-center text-gray-500 dark:text-gray-400">No recent activity.</li>
                    @endforelse
                </ul>
            </div>
        </div>
    </div>
@endsection

@push('scripts')
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
    const ctx = document.getElementById('performanceChart').getContext('2d');
    const performanceChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Class A', 'Class B', 'Class C', 'Class D', 'Class E'], // Placeholder labels
            datasets: [{
                label: 'Average Score',
                data: [82, 75, 91, 88, 79], // Placeholder data
                backgroundColor: 'rgba(34, 202, 220, 0.5)',
                borderColor: 'rgba(34, 202, 220, 1)',
                borderWidth: 1,
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(200, 200, 200, 0.2)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
</script>
@endpush