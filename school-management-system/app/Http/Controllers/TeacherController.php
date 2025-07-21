<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Teacher;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class TeacherController extends Controller

{
    
    public function index()
    {
        $teachers = Teacher::with('user')->paginate(10);
        return view('admin.teachers.index', compact('teachers'));
    }
    
    /**
     * Display the classes assigned to the authenticated teacher.
     *
     * @return \Illuminate\View\View
     */
    public function myClasses()
    {
        $teacher = auth()->user()->teacher;
        
        // Eager load students to get the count efficiently
        $classes = $teacher->schoolClasses()->withCount('students')->get();

        return view('teacher.classes.index', compact('classes'));
    }

    public function create()
    {
        return view('admin.teachers.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string',
            'date_of_birth' => 'nullable|date',
            'gender' => 'required|in:male,female',
        ]);

        DB::transaction(function () use ($request) {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            $user->assignRole('Teacher');

            Teacher::create([
                'user_id' => $user->id,
                'phone' => $request->phone,
                'address' => $request->address,
                'date_of_birth' => $request->date_of_birth,
                'gender' => $request->gender,
            ]);
        });

        return redirect()->route('admin.teachers.index')->with('success', 'Teacher created successfully.');
    }

    public function show(Teacher $teacher)
    {
        $teacher->load('user', 'classes.subject');
        return view('admin.teachers.show', compact('teacher'));
    }

    public function edit(Teacher $teacher)
    {
        return view('admin.teachers.edit', compact('teacher'));
    }

    public function update(Request $request, Teacher $teacher)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $teacher->user_id,
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string',
            'date_of_birth' => 'nullable|date',
            'gender' => 'required|in:male,female',
            'status' => 'required|in:active,inactive',
        ]);

        DB::transaction(function () use ($request, $teacher) {
            $teacher->user->update([
                'name' => $request->name,
                'email' => $request->email,
            ]);

            if ($request->filled('password')) {
                $teacher->user->update(['password' => Hash::make($request->password)]);
            }

            $teacher->update([
                'phone' => $request->phone,
                'address' => $request->address,
                'date_of_birth' => $request->date_of_birth,
                'gender' => $request->gender,
                'status' => $request->status,
            ]);
        });

        return redirect()->route('admin.teachers.index')->with('success', 'Teacher updated successfully.');
    }

    public function destroy(Teacher $teacher)
    {
        DB::transaction(function () use ($teacher) {
            $teacher->user->delete();
            $teacher->delete();
        });

        return redirect()->route('admin.teachers.index')->with('success', 'Teacher deleted successfully.');
    }
}
