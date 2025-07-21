@extends('layouts.admin')

@section('title', 'Add New Result')
@section('page-title', 'Add New Result')
@section('page-description', 'Fill in the details to add a new student result.')

@section('content')
    <div class="bg-white shadow-lg rounded-lg p-6">
        <form action="{{ route('admin.results.store') }}" method="POST">
            @csrf
            @include('admin.results._form')
        </form>
    </div>
@endsection
