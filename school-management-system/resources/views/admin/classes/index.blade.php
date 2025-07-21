@extends('layouts.app')

@section('title', 'Classes Management')

@section('content')
<div x-data="{
    isCreateModalOpen: false,
    isEditModalOpen: false,
    isDeleteModalOpen: false,
    editClass: {},
    deleteClassUrl: ''
}" class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">

    <!-- Page Header -->
    <div class="flex justify-between items-center mb-6">
        <div>
            <h1 class="text-3xl font-bold text-gray-800">Classes Management</h1>
            <p class="text-sm text-gray-600 mt-1">Manage school classes and sections</p>
        </div>
        <button @click="isCreateModalOpen = true" class="bg-gray-900 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-800 transition duration-300 ease-in-out flex items-center">
            <i class="fas fa-plus mr-2"></i>
            Add New Class
        </button>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-lg font-medium text-gray-600">Total Classes</h3>
            <p class="text-3xl font-bold text-gray-900 mt-2">{{ $stats['total_classes'] }}</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-lg font-medium text-gray-600">Total Students</h3>
            <p class="text-3xl font-bold text-gray-900 mt-2">{{ $stats['total_students'] }}</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-lg font-medium text-gray-600">Active Teachers</h3>
            <p class="text-3xl font-bold text-gray-900 mt-2">{{ $stats['active_teachers'] }}</p>
        </div>
    </div>

    <!-- Classes Table -->
    <div class="bg-white shadow-md rounded-lg overflow-hidden">
        <div class="px-6 py-4 border-b">
            <h2 class="text-xl font-semibold text-gray-800">All Classes</h2>
        </div>
        <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class Name</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Section</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teacher</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    @forelse ($classes as $class)
                        <tr>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ $class->name }}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ $class->section ?? 'N/A' }}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ $class->capacity }}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ $class->teacher->user->name ?? 'Not Assigned' }}</td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full {{ $class->status == 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800' }}">
                                    {{ ucfirst($class->status) }}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button @click="isEditModalOpen = true; editClass = {{ $class->toJson() }}" class="text-indigo-600 hover:text-indigo-900 transition duration-150 ease-in-out">Edit</button>
                                <button @click="isDeleteModalOpen = true; deleteClassUrl = '{{ route('admin.classes.destroy', $class) }}'" class="text-red-600 hover:text-red-900 ml-4 transition duration-150 ease-in-out">Delete</button>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="6" class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">No classes found.</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
        <div class="px-6 py-4">
            {{ $classes->links() }}
        </div>
    </div>

    <!-- Create Class Modal -->
    <div x-show="isCreateModalOpen" @keydown.escape.window="isCreateModalOpen = false" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div x-show="isCreateModalOpen" x-transition:enter="ease-out duration-300" x-transition:enter-start="opacity-0" x-transition:enter-end="opacity-100" x-transition:leave="ease-in duration-200" x-transition:leave-start="opacity-100" x-transition:leave-end="opacity-0" class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="isCreateModalOpen = false"></div>
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div x-show="isCreateModalOpen" x-transition:enter="ease-out duration-300" x-transition:enter-start="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" x-transition:enter-end="opacity-100 translate-y-0 sm:scale-100" x-transition:leave="ease-in duration-200" x-transition:leave-start="opacity-100 translate-y-0 sm:scale-100" x-transition:leave-end="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <form action="{{ route('admin.classes.store') }}" method="POST">
                    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">Add New Class</h3>
                        <div class="mt-4">
                            @include('admin.classes._form', ['teachers' => $teachers])
                        </div>
                    </div>
                    <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button type="submit" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-900 text-base font-medium text-white hover:bg-gray-800 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">Create Class</button>
                        <button type="button" @click="isCreateModalOpen = false" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Edit Class Modal -->
    <div x-show="isEditModalOpen" @keydown.escape.window="isEditModalOpen = false" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div x-show="isEditModalOpen" x-transition:enter="ease-out duration-300" x-transition:enter-start="opacity-0" x-transition:enter-end="opacity-100" x-transition:leave="ease-in duration-200" x-transition:leave-start="opacity-100" x-transition:leave-end="opacity-0" class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="isEditModalOpen = false"></div>
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div x-show="isEditModalOpen" x-transition:enter="ease-out duration-300" x-transition:enter-start="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" x-transition:enter-end="opacity-100 translate-y-0 sm:scale-100" x-transition:leave="ease-in duration-200" x-transition:leave-start="opacity-100 translate-y-0 sm:scale-100" x-transition:leave-end="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <form :action="'/admin/classes/' + editClass.id" method="POST">
                    @method('PUT')
                    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <h3 class="text-lg leading-6 font-medium text-gray-900">Edit Class</h3>
                        <div class="mt-4" x-data="{ class: editClass }">
                            @include('admin.classes._form', ['teachers' => $teachers])
                        </div>
                    </div>
                    <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button type="submit" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-900 text-base font-medium text-white hover:bg-gray-800 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">Update Class</button>
                        <button type="button" @click="isEditModalOpen = false" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Delete Class Modal -->
    <div x-show="isDeleteModalOpen" @keydown.escape.window="isDeleteModalOpen = false" class="fixed inset-0 z-50 overflow-y-auto">
        <div class="flex items-center justify-center min-h-screen">
            <div x-show="isDeleteModalOpen" x-transition class="fixed inset-0 bg-gray-500 bg-opacity-75" @click="isDeleteModalOpen = false"></div>
            <div x-show="isDeleteModalOpen" x-transition class="bg-white rounded-lg shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                <form :action="deleteClassUrl" method="POST">
                    @csrf
                    @method('DELETE')
                    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div class="sm:flex sm:items-start">
                            <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                <i class="fas fa-exclamation-triangle text-red-600"></i>
                            </div>
                            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 class="text-lg leading-6 font-medium text-gray-900">Delete Class</h3>
                                <div class="mt-2">
                                    <p class="text-sm text-gray-500">Are you sure you want to delete this class? This action cannot be undone.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button type="submit" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">Delete</button>
                        <button type="button" @click="isDeleteModalOpen = false" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
@endsection

@section('title', 'Classes')
@section('page-title', 'Classes')
@section('page-description', 'Manage all school classes.')

@section('content')
    <div class="flex justify-end mb-4">
        <a href="{{ route('admin.classes.create') }}" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add New Class
        </a>
    </div>
    <div class="bg-white shadow-lg rounded-lg overflow-hidden">
        <table class="min-w-full bg-white">
            <thead class="bg-gray-800 text-white">
                <tr>
                    <th class="w-1/4 text-left py-3 px-4 uppercase font-semibold text-sm">Class Name</th>
                    <th class="w-1/4 text-left py-3 px-4 uppercase font-semibold text-sm">Section</th>
                    <th class="w-1/4 text-left py-3 px-4 uppercase font-semibold text-sm">Class Teacher</th>
                    <th class="w-1/4 text-left py-3 px-4 uppercase font-semibold text-sm">Capacity</th>
                    <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Actions</th>
                </tr>
            </thead>
            <tbody class="text-gray-700">
                @forelse ($classes as $class)
                    <tr>
                        <td class="w-1/4 text-left py-3 px-4">{{ $class->name }}</td>
                        <td class="w-1/4 text-left py-3 px-4">{{ $class->section }}</td>
                        <td class="w-1/4 text-left py-3 px-4">{{ $class->teacher->user->name ?? 'Not Assigned' }}</td>
                        <td class="w-1/4 text-left py-3 px-4">{{ $class->capacity }}</td>
                        <td class="text-left py-3 px-4">
                            <a href="{{ route('admin.classes.show', $class->id) }}" class="text-green-500 hover:text-green-700">View</a>
                            <a href="{{ route('admin.classes.edit', $class->id) }}" class="text-blue-500 hover:text-blue-700 ml-2">Edit</a>
                            <form action="{{ route('admin.classes.destroy', $class->id) }}" method="POST" class="inline-block" onsubmit="return confirm('Are you sure you want to delete this class?');">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="text-red-500 hover:text-red-700 ml-2">Delete</button>
                            </form>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="5" class="text-center py-4">No classes found.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
        <div class="p-4">
            {{ $classes->links() }}
        </div>
    </div>
@endsection
