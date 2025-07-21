<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\User;
use App\Models\SchoolClass;
use App\Models\ParentModel;
use App\Models\Grade;
use App\Models\Attendance;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class StudentController extends Controller
{
    public function index()
    {
        $students = Student::with(['user', 'schoolClass'])->paginate(10);
        return view('admin.students.index', compact('students'));
    }

    public function create()
    {
        $classes = SchoolClass::where('status', 'active')->get();
        $parents = ParentModel::with('user')->get();
        return view('admin.students.create', compact('classes', 'parents'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'student_id' => 'required|string|unique:students',
            'admission_number' => 'required|string|unique:students',
            'date_of_birth' => 'required|date',
            'gender' => 'required|in:male,female',
            'address' => 'required|string',
            'phone' => 'nullable|string',
            'admission_date' => 'required|date',
            'class_id' => 'nullable|exists:school_classes,id',
            'parents' => 'array',
            'parents.*' => 'exists:parent_models,id',
        ]);

        DB::transaction(function () use ($request) {
            // Create user
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => 'student',
            ]);

            // Create student
            $student = Student::create([
                'user_id' => $user->id,
                'class_id' => $request->class_id,
                'student_id' => $request->student_id,
                'admission_number' => $request->admission_number,
                'date_of_birth' => $request->date_of_birth,
                'gender' => $request->gender,
                'address' => $request->address,
                'phone' => $request->phone,
                'admission_date' => $request->admission_date,
            ]);

            // Attach parents if selected
            if ($request->has('parents')) {
                $student->parents()->attach($request->parents);
            }
        });

        return redirect()->route('admin.students.index')->with('success', 'Student created successfully.');
    }

    public function show(Student $student)
    {
        $student->load(['user', 'schoolClass', 'parents.user', 'grades.subject', 'attendances']);
        return view('admin.students.show', compact('student'));
    }

    public function edit(Student $student)
    {
        $classes = SchoolClass::where('status', 'active')->get();
        $parents = ParentModel::with('user')->get();
        $student->load(['user', 'parents']);
        return view('admin.students.edit', compact('student', 'classes', 'parents'));
    }

    public function update(Request $request, Student $student)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $student->user_id,
            'student_id' => 'required|string|unique:students,student_id,' . $student->id,
            'admission_number' => 'required|string|unique:students,admission_number,' . $student->id,
            'date_of_birth' => 'required|date',
            'gender' => 'required|in:male,female',
            'address' => 'required|string',
            'phone' => 'nullable|string',
            'admission_date' => 'required|date',
            'class_id' => 'nullable|exists:school_classes,id',
            'status' => 'required|in:active,inactive,graduated',
            'parents' => 'array',
            'parents.*' => 'exists:parent_models,id',
        ]);

        DB::transaction(function () use ($request, $student) {
            // Update user
            $student->user->update([
                'name' => $request->name,
                'email' => $request->email,
            ]);

            // Update password if provided
            if ($request->filled('password')) {
                $student->user->update([
                    'password' => Hash::make($request->password),
                ]);
            }

            // Update student
            $student->update([
                'class_id' => $request->class_id,
                'student_id' => $request->student_id,
                'admission_number' => $request->admission_number,
                'date_of_birth' => $request->date_of_birth,
                'gender' => $request->gender,
                'address' => $request->address,
                'phone' => $request->phone,
                'admission_date' => $request->admission_date,
                'status' => $request->status,
            ]);

            // Sync parents
            if ($request->has('parents')) {
                $student->parents()->sync($request->parents);
            } else {
                $student->parents()->detach();
            }
        });

        return redirect()->route('admin.students.index')->with('success', 'Student updated successfully.');
    }

    public function destroy(Student $student)
    {
        $student->user->delete(); // This will cascade delete the student record
        return redirect()->route('admin.students.index')->with('success', 'Student deleted successfully.');
    }

    // Teacher methods
    public function teacherStudents()
    {
        $teacher = auth()->user()->teacher;
        $students = Student::whereIn('class_id', $teacher->classes->pluck('id'))
            ->with(['user', 'schoolClass'])
            ->get();
        
        return view('teacher.students', compact('students'));
    }

    public function attendance()
    {
        $teacher = auth()->user()->teacher;
        $classes = $teacher->classes()->with('students.user')->get();
        
        return view('teacher.attendance', compact('classes'));
    }

    public function storeAttendance(Request $request)
    {
        $request->validate([
            'class_id' => 'required|exists:school_classes,id',
            'date' => 'required|date',
            'attendance' => 'required|array',
            'attendance.*' => 'required|in:present,absent,late,excused',
        ]);

        foreach ($request->attendance as $studentId => $status) {
            Attendance::updateOrCreate(
                [
                    'student_id' => $studentId,
                    'date' => $request->date,
                ],
                [
                    'class_id' => $request->class_id,
                    'status' => $status,
                    'marked_by' => auth()->id(),
                ]
            );
        }

        return redirect()->back()->with('success', 'Attendance marked successfully.');
    }

    // Student methods
    public function grades()
    {
        $student = auth()->user()->student;
        $grades = $student->grades()->with('subject')->orderBy('exam_date', 'desc')->get();
        
        return view('student.grades', compact('grades'));
    }

    public function studentAttendance()
    {
        $student = auth()->user()->student;
        $attendances = $student->attendances()
            ->with('schoolClass')
            ->orderBy('date', 'desc')
            ->paginate(20);
        
        $stats = [
            'present' => $student->attendances()->where('status', 'present')->count(),
            'absent' => $student->attendances()->where('status', 'absent')->count(),
            'late' => $student->attendances()->where('status', 'late')->count(),
            'excused' => $student->attendances()->where('status', 'excused')->count(),
            'total' => $student->attendances()->count(),
        ];
        
        if ($stats['total'] > 0) {
            $stats['present_percentage'] = round(($stats['present'] / $stats['total']) * 100, 2);
        } else {
            $stats['present_percentage'] = 0;
        }
        
        return view('student.attendance', compact('attendances', 'stats'));
    }
}
