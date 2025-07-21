@extends('layouts.admin')

@section('title', 'Results')
@section('page-title', 'Results')
@section('page-description', 'Manage student results.')

@section('content')
    <div class="flex justify-end mb-4">
        <a href="{{ route('admin.results.create') }}" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Create New Result
        </a>
    </div>
    <div class="bg-white shadow-lg rounded-lg overflow-hidden">
        <table class="min-w-full bg-white">
            <thead class="bg-gray-800 text-white">
                <tr>
                    <th class="w-1/6 text-left py-3 px-4 uppercase font-semibold text-sm">Student</th>
                    <th class="w-1/6 text-left py-3 px-4 uppercase font-semibold text-sm">Subject</th>
                    <th class="w-1/6 text-left py-3 px-4 uppercase font-semibold text-sm">Exam Type</th>
                    <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Marks</th>
                    <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Exam Date</th>
                    <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Actions</th>
                </tr>
            </thead>
            <tbody class="text-gray-700">
                @forelse ($grades as $grade)
                    <tr>
                        <td class="w-1/6 text-left py-3 px-4">{{ $grade->student->name }}</td>
                        <td class="w-1/6 text-left py-3 px-4">{{ $grade->subject->name }}</td>
                        <td class="w-1/6 text-left py-3 px-4">{{ $grade->exam_type }}</td>
                        <td class="text-left py-3 px-4">{{ $grade->marks_obtained }} / {{ $grade->total_marks }}</td>
                        <td class="text-left py-3 px-4">{{ $grade->exam_date->format('d M Y') }}</td>
                        <td class="text-left py-3 px-4">
                            <a href="{{ route('admin.results.edit', $grade->id) }}" class="text-blue-500 hover:text-blue-700">Edit</a>
                            <form action="{{ route('admin.results.destroy', $grade->id) }}" method="POST" class="inline-block" onsubmit="return confirm('Are you sure you want to delete this result?');">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="text-red-500 hover:text-red-700 ml-2">Delete</button>
                            </form>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="6" class="text-center py-4">No results found.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
        <div class="p-4">
            {{ $grades->links() }}
        </div>
    </div>
@endsection
