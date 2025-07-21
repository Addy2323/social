@extends('layouts.admin')

@section('title', 'Edit Fee')
@section('page-title', 'Edit Fee')
@section('page-description', 'Update an existing fee record.')

@section('content')
    <div class="bg-white shadow-lg rounded-lg p-6">
        <form action="{{ route('admin.fees.update', $fee->id) }}" method="POST">
            @method('PUT')
            @include('admin.fees._form')
        </form>
    </div>
@endsection
