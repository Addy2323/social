@extends('layouts.admin')

@section('title', 'Class Details')
@section('page-title', 'Class Details')
@section('page-description', 'View the details of a class.')

@section('content')
    <div class="bg-white shadow-lg rounded-lg p-6">
        <div class="mb-4">
            <h3 class="text-xl font-bold mb-2">Class Information</h3>
            <p><strong>Class Name:</strong> {{ $class->name }}</p>
            <p><strong>Section:</strong> {{ $class->section }}</p>
            <p><strong>Class Teacher:</strong> {{ $class->teacher->user->name ?? 'Not Assigned' }}</p>
            <p><strong>Capacity:</strong> {{ $class->capacity }}</p>
            <p><strong>Status:</strong> {{ ucfirst($class->status) }}</p>
            <p><strong>Description:</strong> {{ $class->description }}</p>
        </div>

        <div class="mb-4">
            <h3 class="text-xl font-bold mb-2">Students in this Class</h3>
            @if($class->students->count() > 0)
                <ul class="list-disc list-inside">
                    @foreach($class->students as $student)
                        <li>{{ $student->user->name }}</li>
                    @endforeach
                </ul>
            @else
                <p>No students assigned to this class.</p>
            @endif
        </div>

        <div class="flex items-center">
            <a href="{{ route('admin.classes.index') }}" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                Back to List
            </a>
        </div>
    </div>
@endsection
