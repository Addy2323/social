@extends('layouts.admin')

@section('title', 'Student Details')

@section('page-title', 'Student Details')
@section('page-description', 'View detailed information for ' . $student->user->name)

@section('content')
    <div class="bg-white p-6 rounded-lg shadow-sm">
        <div class="flex justify-end mb-4">
            <a href="{{ route('admin.students.edit', $student) }}" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Edit</a>
            <a href="{{ route('admin.students.index') }}" class="bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded">Back to List</a>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <h3 class="text-lg font-medium text-gray-900">Personal Information</h3>
                <dl class="mt-2 divide-y divide-gray-200">
                    <div class="py-3 flex justify-between text-sm font-medium">
                        <dt class="text-gray-500">Full Name</dt>
                        <dd class="text-gray-900">{{ $student->user->name }}</dd>
                    </div>
                    <div class="py-3 flex justify-between text-sm font-medium">
                        <dt class="text-gray-500">Email</dt>
                        <dd class="text-gray-900">{{ $student->user->email }}</dd>
                    </div>
                    <div class="py-3 flex justify-between text-sm font-medium">
                        <dt class="text-gray-500">Date of Birth</dt>
                        <dd class="text-gray-900">{{ $student->date_of_birth->format('F j, Y') }}</dd>
                    </div>
                    <div class="py-3 flex justify-between text-sm font-medium">
                        <dt class="text-gray-500">Gender</dt>
                        <dd class="text-gray-900">{{ ucfirst($student->gender) }}</dd>
                    </div>
                    <div class="py-3 flex justify-between text-sm font-medium">
                        <dt class="text-gray-500">Address</dt>
                        <dd class="text-gray-900">{{ $student->address }}</dd>
                    </div>
                    <div class="py-3 flex justify-between text-sm font-medium">
                        <dt class="text-gray-500">Phone</dt>
                        <dd class="text-gray-900">{{ $student->phone ?? 'N/A' }}</dd>
                    </div>
                </dl>
            </div>

            <div>
                <h3 class="text-lg font-medium text-gray-900">Academic Information</h3>
                <dl class="mt-2 divide-y divide-gray-200">
                    <div class="py-3 flex justify-between text-sm font-medium">
                        <dt class="text-gray-500">Student ID</dt>
                        <dd class="text-gray-900">{{ $student->student_id }}</dd>
                    </div>
                    <div class="py-3 flex justify-between text-sm font-medium">
                        <dt class="text-gray-500">Admission Number</dt>
                        <dd class="text-gray-900">{{ $student->admission_number }}</dd>
                    </div>
                    <div class="py-3 flex justify-between text-sm font-medium">
                        <dt class="text-gray-500">Admission Date</dt>
                        <dd class="text-gray-900">{{ $student->admission_date->format('F j, Y') }}</dd>
                    </div>
                    <div class="py-3 flex justify-between text-sm font-medium">
                        <dt class="text-gray-500">Class</dt>
                        <dd class="text-gray-900">{{ $student->schoolClass->name ?? 'N/A' }}</dd>
                    </div>
                    <div class="py-3 flex justify-between text-sm font-medium">
                        <dt class="text-gray-500">Status</dt>
                        <dd class="text-gray-900">
                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full {{ $student->status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800' }}">
                                {{ ucfirst($student->status) }}
                            </span>
                        </dd>
                    </div>
                </dl>
            </div>
        </div>

        <div class="mt-8">
            <h3 class="text-lg font-medium text-gray-900">Assigned Parents</h3>
            @if($student->parents->isNotEmpty())
                <ul class="mt-2 divide-y divide-gray-200 border-t border-b">
                    @foreach($student->parents as $parent)
                        <li class="py-3 flex justify-between items-center">
                            <span class="text-sm font-medium text-gray-900">{{ $parent->user->name }}</span>
                            <span class="text-sm text-gray-500">{{ $parent->user->email }}</span>
                        </li>
                    @endforeach
                </ul>
            @else
                <p class="mt-2 text-sm text-gray-500">No parents assigned.</p>
            @endif
        </div>
    </div>
@endsection
