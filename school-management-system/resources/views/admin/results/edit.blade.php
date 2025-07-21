@extends('layouts.admin')

@section('title', 'Edit Result')
@section('page-title', 'Edit Result')
@section('page-description', 'Update the details of the student result.')

@section('content')
    <div class="bg-white shadow-lg rounded-lg p-6">
        <form action="{{ route('admin.results.update', $result->id) }}" method="POST">
            @csrf
            @method('PUT')
            @include('admin.results._form', ['result' => $result])
        </form>
    </div>
@endsection
