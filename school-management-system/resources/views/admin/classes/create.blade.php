@extends('layouts.admin')

@section('title', 'Add New Class')
@section('page-title', 'Add New Class')
@section('page-description', 'Create a new class.')

@section('content')
    <div class="bg-white shadow-lg rounded-lg p-6">
        <form action="{{ route('admin.classes.store') }}" method="POST">
            @include('admin.classes._form')
        </form>
    </div>
@endsection
