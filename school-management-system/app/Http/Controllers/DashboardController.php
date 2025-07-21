<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\SchoolClass;
use App\Models\Student;
use App\Models\Teacher;

class DashboardController extends Controller
{
    /**
     * Display the appropriate dashboard based on user's role.
     *
     * @return \Illuminate\View\View
     */
    public function index()
    {
        $user = auth()->user();
        
        if ($user->hasRole('admin')) {
            return $this->adminDashboard();
        } elseif ($user->hasRole('teacher')) {
            return $this->teacherDashboard();
        } elseif ($user->hasRole('student')) {
            return $this->studentDashboard();
        } elseif ($user->hasRole('parent')) {
            return $this->parentDashboard();
        }
        
        return redirect()->route('home');
    }
    /**
     * Show the admin dashboard.
     */
    public function adminDashboard()
    {
        $stats = [
            'total_students' => Student::count(),
            'total_teachers' => Teacher::count(),
            'total_classes' => SchoolClass::count(),
        ];
        return view('dashboard.admin', compact('stats'));
    }

    /**
     * Show the teacher dashboard.
     */
    public function teacherDashboard()
    {
        $teacher = Auth::user()->teacher;

        if (!$teacher) {
            // This can happen if a user with the 'teacher' role doesn't have an associated teacher record.
            abort(404, 'Teacher profile not found for the logged-in user.');
        }

        // Fetch the number of classes assigned to the teacher.
        $myClassesCount = $teacher->classes()->count();

        // Fetch the total number of students across all of the teacher's classes.
        $totalStudentsCount = 0;
        // We eager load the students count for efficiency.
        foreach ($teacher->classes()->withCount('students')->get() as $class) {
            $totalStudentsCount += $class->students_count;
        }

        // The following stats are placeholders for now, as their features are not yet built.
        $attendanceRate = 92; 
        $assignmentsCount = 24;

        // This is a placeholder for a future "Recent Activity" feed.
        $recentActivity = [
            ['text' => 'New student enrollment completed', 'time' => '2h ago', 'type' => 'student'],
            ['text' => 'Monthly fee payment received', 'time' => '4h ago', 'type' => 'payment'],
            ['text' => 'New announcement published', 'time' => '1d ago', 'type' => 'announcement'],
        ];

        // The view path must match your file location: resources/views/dashboard/teacher.blade.php
        return view('dashboard.teacher', compact(
            'myClassesCount',
            'totalStudentsCount',
            'attendanceRate',
            'assignmentsCount',
            'recentActivity'
        ));
    }

    /**
     * Show the student dashboard.
     */
    public function studentDashboard()
    {
        // Add logic for student dashboard here.
        return view('dashboard.student'); // Make sure this view exists
    }

    /**
     * Show the parent dashboard.
     */
    public function parentDashboard()
    {
        // Add logic for parent dashboard here.
        return view('dashboard.parent'); // Make sure this view exists
    }
}