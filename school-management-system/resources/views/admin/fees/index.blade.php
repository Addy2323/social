@extends('layouts.admin')

@section('title', 'Fees')
@section('page-title', 'Fees')
@section('page-description', 'Manage student fees.')

@section('content')
    <div class="flex justify-end mb-4">
        <a href="{{ route('admin.fees.create') }}" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add New Fee
        </a>
    </div>

    <div class="bg-white shadow-lg rounded-lg overflow-hidden">
        <table class="min-w-full bg-white">
            <thead class="bg-gray-800 text-white">
                <tr>
                    <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Student</th>
                    <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Fee Type</th>
                    <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Amount</th>
                    <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Due Date</th>
                    <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Status</th>
                    <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Actions</th>
                </tr>
            </thead>
            <tbody class="text-gray-700">
                @forelse ($fees as $fee)
                    <tr>
                        <td class="text-left py-3 px-4">{{ $fee->student->user->name }}</td>
                        <td class="text-left py-3 px-4">{{ $fee->fee_type }}</td>
                        <td class="text-left py-3 px-4">{{ $fee->amount }} {{ config('app.currency_symbol') }}</td>
                        <td class="text-left py-3 px-4">{{ $fee->due_date->format('M d, Y') }}</td>
                        <td class="text-left py-3 px-4">
                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                @if($fee->status == 'paid') bg-green-100 text-green-800 @endif
                                @if($fee->status == 'unpaid') bg-red-100 text-red-800 @endif
                                @if($fee->status == 'partially_paid') bg-yellow-100 text-yellow-800 @endif">
                                {{ ucfirst($fee->status) }}
                            </span>
                        </td>
                        <td class="text-left py-3 px-4">
                            <a href="{{ route('admin.fees.edit', $fee->id) }}" class="text-blue-500 hover:text-blue-700">Edit</a>
                            <form action="{{ route('admin.fees.destroy', $fee->id) }}" method="POST" class="inline-block" onsubmit="return confirm('Are you sure you want to delete this fee record?');">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="text-red-500 hover:text-red-700 ml-2">Delete</button>
                            </form>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="6" class="text-center py-4">No fees found.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
        <div class="p-4">
            {{ $fees->links() }}
        </div>
    </div>
@endsection
