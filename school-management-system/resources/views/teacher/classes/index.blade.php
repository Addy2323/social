@extends('layouts.teacher')

@section('title', 'My Classes')
@section('page-title', 'My Classes')

@section('content')
<div class="container mx-auto px-4">
    <div class="bg-white shadow-md rounded-lg overflow-hidden">
        <div class="p-6">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">Your Assigned Classes</h2>
        </div>
        <div class="overflow-x-auto">
            <table class="min-w-full bg-white">
                <thead class="bg-gray-800 text-white">
                    <tr>
                        <th class="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Class Name</th>
                        <th class="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Section</th>
                        <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Students</th>
                        <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Status</th>
                        <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Actions</th>
                    </tr>
                </thead>
                <tbody class="text-gray-700">
                    @forelse ($classes as $class)
                        <tr class="border-b border-gray-200 hover:bg-gray-100">
                            <td class="w-1/3 text-left py-3 px-4">{{ $class->name }}</td>
                            <td class="w-1/3 text-left py-3 px-4">{{ $class->section }}</td>
                            <td class="text-left py-3 px-4">{{ $class->students_count }}</td>
                            <td class="text-left py-3 px-4">
                                @php
                                    $statusColor = [
                                        'Active' => 'bg-green-100 text-green-700',
                                        'Inactive' => 'bg-red-100 text-red-700',
                                        'Full' => 'bg-blue-100 text-blue-700',
                                    ][$class->status] ?? 'bg-gray-100 text-gray-700';
                                @endphp
                                <span class="px-2 py-1 font-semibold leading-tight rounded-full text-xs {{ $statusColor }}">
                                    {{ $class->status }}
                                </span>
                            </td>
                            <td class="text-left py-3 px-4">
                                <a href="#" class="text-teal-600 hover:text-teal-900 mr-2">
                                    <i class="fas fa-eye"></i>
                                </a>
                                <a href="#" class="text-blue-600 hover:text-blue-900">
                                    <i class="fas fa-users"></i>
                                </a>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="5" class="text-center py-4 text-gray-500">You are not assigned to any classes.</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
</div>
@endsection
