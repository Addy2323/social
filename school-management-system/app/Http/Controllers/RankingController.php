<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RankingController extends Controller
{
    public function index()
    {
        $students = Student::with('grades')->select('students.*', DB::raw('AVG(grades.marks_obtained) as average_marks'))
            ->join('grades', 'students.id', '=', 'grades.student_id')
            ->groupBy('students.id')
            ->orderByDesc('average_marks')
            ->paginate(10);

        return view('admin.rankings.index', compact('students'));
    }
}
