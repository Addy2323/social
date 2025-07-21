@extends('layouts.admin')

@section('title', 'Announcements - Admin Panel')
@section('page-title', 'Announcements')
@section('page-description', 'Create and manage school announcements')

@section('content')
<!-- Statistics Cards -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <!-- Total Announcements -->
    <div class="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div class="flex items-center justify-between">
            <div>
                <p class="text-sm font-medium text-gray-500">Total Announcements</p>
                <p class="text-2xl font-bold text-gray-900 mt-1">3</p>
            </div>
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <i class="fas fa-bell text-blue-600 text-lg"></i>
            </div>
        </div>
    </div>

    <!-- Published -->
    <div class="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div class="flex items-center justify-between">
            <div>
                <p class="text-sm font-medium text-gray-500">Published</p>
                <p class="text-2xl font-bold text-gray-900 mt-1">2</p>
            </div>
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <i class="fas fa-check-circle text-green-600 text-lg"></i>
            </div>
        </div>
    </div>

    <!-- Drafts -->
    <div class="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div class="flex items-center justify-between">
            <div>
                <p class="text-sm font-medium text-gray-500">Drafts</p>
                <p class="text-2xl font-bold text-gray-900 mt-1">1</p>
            </div>
            <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <i class="fas fa-edit text-yellow-600 text-lg"></i>
            </div>
        </div>
    </div>

    <!-- Urgent -->
    <div class="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div class="flex items-center justify-between">
            <div>
                <p class="text-sm font-medium text-gray-500">Urgent</p>
                <p class="text-2xl font-bold text-gray-900 mt-1">0</p>
            </div>
            <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <i class="fas fa-exclamation-triangle text-red-600 text-lg"></i>
            </div>
        </div>
    </div>
</div>

<!-- Announcements List -->
<div class="bg-white rounded-lg shadow-sm border border-gray-200">
    <div class="p-6 border-b border-gray-200 flex justify-between items-center">
        <div>
            <h3 class="text-lg font-semibold text-gray-900">All Announcements</h3>
            <p class="text-sm text-gray-500 mt-1">Manage and view all announcements</p>
        </div>
        <button class="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
            <i class="fas fa-plus mr-2"></i>Create Announcement
        </button>
    </div>

    <div class="p-6">
        <!-- Sample Announcements -->
        <div class="space-y-4">
            <!-- Announcement 1 -->
            <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div class="flex-1">
                    <div class="flex items-center gap-3 mb-2">
                        <h4 class="font-medium text-gray-900">School Reopening Notice</h4>
                        <span class="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">High</span>
                        <span class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Published</span>
                    </div>
                    <p class="text-sm text-gray-600 mb-2">By Principal Smith • 1/15/2024 • All Students</p>
                    <p class="text-sm text-gray-700">School will reopen on January 22nd, 2024. All students are expected to attend classes regularly.</p>
                </div>
                <div class="flex items-center gap-2">
                    <button class="text-blue-600 hover:text-blue-800">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="text-red-600 hover:text-red-800">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>

            <!-- Announcement 2 -->
            <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div class="flex-1">
                    <div class="flex items-center gap-3 mb-2">
                        <h4 class="font-medium text-gray-900">Parent-Teacher Meeting</h4>
                        <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Medium</span>
                        <span class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Published</span>
                    </div>
                    <p class="text-sm text-gray-600 mb-2">By Admin Office • 1/16/2024 • Parents</p>
                    <p class="text-sm text-gray-700">Parent-teacher meetings are scheduled for next week. Please check the schedule.</p>
                </div>
                <div class="flex items-center gap-2">
                    <button class="text-blue-600 hover:text-blue-800">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="text-red-600 hover:text-red-800">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>

            <!-- Announcement 3 -->
            <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div class="flex-1">
                    <div class="flex items-center gap-3 mb-2">
                        <h4 class="font-medium text-gray-900">Sports Day Preparation</h4>
                        <span class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Low</span>
                        <span class="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Draft</span>
                    </div>
                    <p class="text-sm text-gray-600 mb-2">By Sports Coordinator • 1/17/2024 • Students</p>
                    <p class="text-sm text-gray-700">Students interested in participating in sports day should register by Friday.</p>
                </div>
                <div class="flex items-center gap-2">
                    <button class="text-blue-600 hover:text-blue-800">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="text-red-600 hover:text-red-800">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
