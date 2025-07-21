@extends('layouts.admin')

@section('title', 'Edit Class')
@section('page-title', 'Edit Class')
@section('page-description', 'Update an existing class.')

@section('content')
    <div class="bg-white shadow-lg rounded-lg p-6">
        <form action="{{ route('admin.classes.update', $class->id) }}" method="POST">
            @method('PUT')
            @include('admin.classes._form')
        </form>
    </div>
@endsection
