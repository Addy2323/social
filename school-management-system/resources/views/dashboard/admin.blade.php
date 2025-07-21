@extends('layouts.admin')

@section('title', 'Admin Dashboard')

@section('content')
                <!-- Statistics Cards -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <!-- Total Students -->
                    <div class="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm font-medium text-gray-500">Total Students</p>
                                <p class="text-2xl font-bold text-gray-900 mt-1">{{ number_format($stats['total_students']) }}</p>
                                <p class="text-sm text-green-600 mt-1">+12% from last month</p>
                            </div>
                            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <i class="fas fa-users text-blue-600 text-lg"></i>
                            </div>
                        </div>
                    </div>

                    <!-- Total Teachers -->
                    <div class="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm font-medium text-gray-500">Total Teachers</p>
                                <p class="text-2xl font-bold text-gray-900 mt-1">{{ $stats['total_teachers'] }}</p>
                                <p class="text-sm text-green-600 mt-1">+3% from last month</p>
                            </div>
                            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <i class="fas fa-chalkboard-teacher text-green-600 text-lg"></i>
                            </div>
                        </div>
                    </div>

                    <!-- Total Classes -->
                    <div class="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm font-medium text-gray-500">Total Classes</p>
                                <p class="text-2xl font-bold text-gray-900 mt-1">{{ $stats['total_classes'] }}</p>
                                <p class="text-sm text-gray-500 mt-1">0% from last month</p>
                            </div>
                            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                <i class="fas fa-door-open text-purple-600 text-lg"></i>
                            </div>
                        </div>
                    </div>

                    <!-- Monthly Revenue -->
                    <div class="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm font-medium text-gray-500">Monthly Revenue</p>
                                <p class="text-2xl font-bold text-gray-900 mt-1">$12,450</p>
                                <p class="text-sm text-green-600 mt-1">+8% from last month</p>
                            </div>
                            <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                <i class="fas fa-dollar-sign text-orange-600 text-lg"></i>
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
                            <livewire:recent-activity wire:poll.15s />
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
                                <a href="{{ route('admin.students.create') }}" class="flex items-center justify-between p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                                    <span class="text-blue-700 font-medium">Add New Student</span>
                                    <i class="fas fa-arrow-right text-blue-500"></i>
                                </a>
                                <a href="#" class="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                                    <span class="text-gray-700 font-medium">Create Announcement</span>
                                    <i class="fas fa-arrow-right text-gray-500"></i>
                                </a>
                            </div>
                        </div>
                    </div>
@endsection
