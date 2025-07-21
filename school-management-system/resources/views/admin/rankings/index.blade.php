@extends('layouts.admin')

@section('title', 'Student Rankings')
@section('page-title', 'Student Rankings')
@section('page-description', 'View student rankings based on average marks.')

@section('content')
    <div class="bg-white shadow-lg rounded-lg overflow-hidden">
        <table class="min-w-full bg-white">
            <thead class="bg-gray-800 text-white">
                <tr>
                    <th class="w-1/6 text-left py-3 px-4 uppercase font-semibold text-sm">Rank</th>
                    <th class="w-2/6 text-left py-3 px-4 uppercase font-semibold text-sm">Student</th>
                    <th class="w-1/6 text-left py-3 px-4 uppercase font-semibold text-sm">Average Marks</th>
                </tr>
            </thead>
            <tbody class="text-gray-700">
                @forelse ($students as $index => $student)
                    <tr>
                        <td class="w-1/6 text-left py-3 px-4">{{ $students->firstItem() + $index }}</td>
                        <td class="w-2/6 text-left py-3 px-4">{{ $student->name }}</td>
                        <td class="w-1/6 text-left py-3 px-4">{{ number_format($student->average_marks, 2) }}</td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="3" class="text-center py-4">No student rankings found.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
        <div class="p-4">
            {{ $students->links() }}
        </div>
    </div>
@endsection
