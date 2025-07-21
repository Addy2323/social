@extends('layouts.admin')

@section('title', 'Edit Student')

@section('page-title', 'Edit Student')
@section('page-description', 'Update student record.')

@section('content')
    <div class="bg-white p-6 rounded-lg shadow-sm">
        <form action="{{ route('admin.students.update', $student) }}" method="POST">
            @csrf
            @method('PUT')

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Name -->
                <div>
                    <label for="name" class="block text-sm font-medium text-gray-700">Full Name</label>
                    <input type="text" name="name" id="name" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" value="{{ old('name', $student->user->name) }}" required>
                    @error('name') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
                </div>

                <!-- Email -->
                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
                    <input type="email" name="email" id="email" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" value="{{ old('email', $student->user->email) }}" required>
                    @error('email') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
                </div>

                <!-- Password -->
                <div>
                    <label for="password" class="block text-sm font-medium text-gray-700">New Password (optional)</label>
                    <input type="password" name="password" id="password" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                    @error('password') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
                </div>

                <!-- Student ID -->
                <div>
                    <label for="student_id" class="block text-sm font-medium text-gray-700">Student ID</label>
                    <input type="text" name="student_id" id="student_id" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" value="{{ old('student_id', $student->student_id) }}" required>
                    @error('student_id') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
                </div>

                <!-- Admission Number -->
                <div>
                    <label for="admission_number" class="block text-sm font-medium text-gray-700">Admission Number</label>
                    <input type="text" name="admission_number" id="admission_number" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" value="{{ old('admission_number', $student->admission_number) }}" required>
                    @error('admission_number') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
                </div>

                <!-- Date of Birth -->
                <div>
                    <label for="date_of_birth" class="block text-sm font-medium text-gray-700">Date of Birth</label>
                    <input type="date" name="date_of_birth" id="date_of_birth" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" value="{{ old('date_of_birth', $student->date_of_birth) }}" required>
                    @error('date_of_birth') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
                </div>

                <!-- Gender -->
                <div>
                    <label for="gender" class="block text-sm font-medium text-gray-700">Gender</label>
                    <select name="gender" id="gender" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required>
                        <option value="male" {{ old('gender', $student->gender) == 'male' ? 'selected' : '' }}>Male</option>
                        <option value="female" {{ old('gender', $student->gender) == 'female' ? 'selected' : '' }}>Female</option>
                    </select>
                    @error('gender') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
                </div>

                <!-- Phone -->
                <div>
                    <label for="phone" class="block text-sm font-medium text-gray-700">Phone</label>
                    <input type="text" name="phone" id="phone" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" value="{{ old('phone', $student->phone) }}">
                    @error('phone') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
                </div>

                <!-- Admission Date -->
                <div>
                    <label for="admission_date" class="block text-sm font-medium text-gray-700">Admission Date</label>
                    <input type="date" name="admission_date" id="admission_date" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" value="{{ old('admission_date', $student->admission_date) }}" required>
                    @error('admission_date') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
                </div>

                <!-- Class -->
                <div>
                    <label for="class_id" class="block text-sm font-medium text-gray-700">Class</label>
                    <select name="class_id" id="class_id" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                        <option value="">Select a class</option>
                        @foreach ($classes as $class)
                            <option value="{{ $class->id }}" {{ old('class_id', $student->class_id) == $class->id ? 'selected' : '' }}>{{ $class->name }}</option>
                        @endforeach
                    </select>
                    @error('class_id') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
                </div>

                <!-- Status -->
                <div>
                    <label for="status" class="block text-sm font-medium text-gray-700">Status</label>
                    <select name="status" id="status" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required>
                        <option value="active" {{ old('status', $student->status) == 'active' ? 'selected' : '' }}>Active</option>
                        <option value="inactive" {{ old('status', $student->status) == 'inactive' ? 'selected' : '' }}>Inactive</option>
                        <option value="graduated" {{ old('status', $student->status) == 'graduated' ? 'selected' : '' }}>Graduated</option>
                    </select>
                    @error('status') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
                </div>

                <!-- Address -->
                <div class="md:col-span-2">
                    <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
                    <textarea name="address" id="address" rows="3" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">{{ old('address', $student->address) }}</textarea>
                    @error('address') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
                </div>

                <!-- Parents -->
                <div class="md:col-span-2">
                    <label for="parents" class="block text-sm font-medium text-gray-700">Assign Parents</label>
                    <select name="parents[]" id="parents" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" multiple>
                        @foreach ($parents as $parent)
                            <option value="{{ $parent->id }}" {{ in_array($parent->id, old('parents', $student->parents->pluck('id')->toArray())) ? 'selected' : '' }}>{{ $parent->user->name }} ({{ $parent->user->email }})</option>
                        @endforeach
                    </select>
                    @error('parents') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
                </div>
            </div>

            <!-- Actions -->
            <div class="flex justify-end mt-6">
                <a href="{{ route('admin.students.index') }}" class="bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded mr-2">Cancel</a>
                <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Update Student</button>
            </div>
        </form>
    </div>
@endsection
