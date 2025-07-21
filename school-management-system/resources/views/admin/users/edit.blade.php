@extends('layouts.admin')

@section('title', 'Edit User')

@section('page-title', 'Edit User')
@section('page-description', 'Update user details and roles.')

@section('content')
    <div class="bg-white p-6 rounded-lg shadow-sm">
        <form action="{{ route('admin.users.update', $user) }}" method="POST">
            @csrf
            @method('PUT')

            <!-- Name -->
            <div class="mb-4">
                <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" name="name" id="name" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" value="{{ old('name', $user->name) }}" required>
                @error('name')
                    <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                @enderror
            </div>

            <!-- Email -->
            <div class="mb-4">
                <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" name="email" id="email" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" value="{{ old('email', $user->email) }}" required>
                @error('email')
                    <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                @enderror
            </div>

            <!-- Password -->
            <div class="mb-4">
                <label for="password" class="block text-sm font-medium text-gray-700">New Password (optional)</label>
                <input type="password" name="password" id="password" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                @error('password')
                    <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                @enderror
            </div>

            <!-- Confirm Password -->
            <div class="mb-4">
                <label for="password_confirmation" class="block text-sm font-medium text-gray-700">Confirm New Password</label>
                <input type="password" name="password_confirmation" id="password_confirmation" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
            </div>

            <!-- Roles -->
            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700">Roles</label>
                <div class="mt-2 space-y-2">
                    @foreach ($roles as $role)
                        <div class="flex items-center">
                            <input id="role_{{ $role->id }}" name="roles[]" type="checkbox" value="{{ $role->name }}" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" {{ $user->hasRole($role->name) ? 'checked' : '' }}>
                            <label for="role_{{ $role->id }}" class="ml-3 block text-sm font-medium text-gray-700">{{ $role->name }}</label>
                        </div>
                    @endforeach
                </div>
                 @error('roles')
                    <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                @enderror
            </div>

            <!-- Actions -->
            <div class="flex justify-end">
                <a href="{{ route('admin.users.index') }}" class="bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded mr-2">Cancel</a>
                <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Update User</button>
            </div>
        </form>
    </div>
@endsection
