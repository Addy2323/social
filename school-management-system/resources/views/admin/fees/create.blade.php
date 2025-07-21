@extends('layouts.admin')

@section('title', 'Add New Fee')
@section('page-title', 'Add New Fee')
@section('page-description', 'Create a new fee record.')

@section('content')
    <div class="bg-white shadow-lg rounded-lg p-6">
        <form action="{{ route('admin.fees.store') }}" method="POST">
            @include('admin.fees._form')
        </form>
    </div>
@endsection
