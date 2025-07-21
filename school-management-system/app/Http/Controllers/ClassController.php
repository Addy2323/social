<?php

namespace App\Http\Controllers;

use App\Models\SchoolClass;
use App\Models\Teacher;
use Illuminate\Http\Request;

class ClassController extends Controller
{
    public function index()
    {
        $classes = SchoolClass::with(['teacher.user', 'students'])->paginate(10);
        $teachers = Teacher::with('user')->where('status', 'active')->get();
        $stats = [
            'total_classes' => SchoolClass::count(),
            'total_students' => \App\Models\Student::count(),
            'active_teachers' => Teacher::where('status', 'active')->count(),
        ];
        
        return view('admin.classes.index', compact('classes', 'stats', 'teachers'));
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'section' => 'required|string|max:255',
            'status' => 'required|in:active,inactive',
            'capacity' => 'required|integer|min:1',
            'teacher_id' => 'nullable|exists:teachers,id', // Validate teacher_id
        ]);
    
        \App\Models\SchoolClass::create($validatedData);
    
        return redirect()->route('admin.classes.index')
                         ->with('success', 'Class created successfully.');
    }

    public function show(SchoolClass $class)
    {
        $class->load(['teacher.user', 'students.user', 'attendances']);
        return view('admin.classes.show', compact('class'));
    }



    public function update(Request $request, \App\Models\SchoolClass $class)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'section' => 'required|string|max:255',
            'status' => 'required|in:active,inactive',
            'capacity' => 'required|integer|min:1',
            'teacher_id' => 'nullable|exists:teachers,id',
        ]);
    
        $class->update($validatedData);
    
        return redirect()->route('admin.classes.index')
                         ->with('success', 'Class updated successfully.');
    }

    public function destroy(SchoolClass $class)
    {
        $class->delete();
        return redirect()->route('admin.classes.index')->with('success', 'Class deleted successfully.');
    }
}
