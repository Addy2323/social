<?php

namespace App\Http\Controllers;

use App\Models\Grade;
use App\Models\Student;
use App\Models\Subject;
use Illuminate\Http\Request;

class ResultController extends Controller
{
    public function index()
    {
        $grades = Grade::with(['student', 'subject'])->latest()->paginate(10);
        return view('admin.results.index', compact('grades'));
    }

    public function create()
    {
        $students = Student::all();
        $subjects = Subject::all();
        return view('admin.results.create', compact('students', 'subjects'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'student_id' => 'required|exists:students,id',
            'subject_id' => 'required|exists:subjects,id',
            'exam_type' => 'required|string|max:255',
            'marks_obtained' => 'required|numeric|min:0',
            'total_marks' => 'required|numeric|min:0',
            'exam_date' => 'required|date',
        ]);

        Grade::create($request->all());

        return redirect()->route('admin.results.index')
            ->with('success', 'Result added successfully.');
    }

    public function edit(Grade $result)
    {
        $students = Student::all();
        $subjects = Subject::all();
        return view('admin.results.edit', compact('result', 'students', 'subjects'));
    }

    public function update(Request $request, Grade $result)
    {
        $request->validate([
            'student_id' => 'required|exists:students,id',
            'subject_id' => 'required|exists:subjects,id',
            'exam_type' => 'required|string|max:255',
            'marks_obtained' => 'required|numeric|min:0',
            'total_marks' => 'required|numeric|min:0',
            'exam_date' => 'required|date',
        ]);

        $result->update($request->all());

        return redirect()->route('admin.results.index')
            ->with('success', 'Result updated successfully.');
    }

    public function destroy(Grade $result)
    {
        $result->delete();

        return redirect()->route('admin.results.index')
            ->with('success', 'Result deleted successfully.');
    }
}
