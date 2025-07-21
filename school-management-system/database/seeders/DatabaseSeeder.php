<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\ParentModel;
use App\Models\SchoolClass;
use App\Models\Subject;
use App\Models\Grade;
use App\Models\Attendance;
use Illuminate\Database\Seeder;
use Database\Seeders\RolesAndPermissionsSeeder;
use Database\Seeders\AdminUserSeeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RolesAndPermissionsSeeder::class,
            AdminUserSeeder::class,
        ]);

        // Create Subjects
        $subjects = [
            ['name' => 'Mathematics', 'code' => 'MATH101', 'credits' => 4],
            ['name' => 'English', 'code' => 'ENG101', 'credits' => 3],
            ['name' => 'Science', 'code' => 'SCI101', 'credits' => 4],
            ['name' => 'History', 'code' => 'HIS101', 'credits' => 2],
            ['name' => 'Geography', 'code' => 'GEO101', 'credits' => 2],
        ];

        foreach ($subjects as $subject) {
            Subject::create($subject);
        }

        // Create Teachers
        $teacherUsers = [
            ['name' => 'John Smith', 'email' => 'john.smith@school.com', 'role' => 'teacher'],
            ['name' => 'Sarah Johnson', 'email' => 'sarah.johnson@school.com', 'role' => 'teacher'],
            ['name' => 'Michael Brown', 'email' => 'michael.brown@school.com', 'role' => 'teacher'],
        ];

        foreach ($teacherUsers as $index => $teacherUser) {
            $user = User::create(array_merge($teacherUser, ['password' => Hash::make('password')]));
            
            Teacher::create([
                'user_id' => $user->id,
                'employee_id' => 'EMP' . str_pad($index + 1, 3, '0', STR_PAD_LEFT),
                'phone' => '555-' . rand(1000, 9999),
                'address' => '123 Teacher Street, City',
                'qualification' => 'Bachelor of Education',
                'specialization' => ['Mathematics', 'English', 'Science'][$index],
                'hire_date' => now()->subYears(rand(1, 5)),
                'salary' => rand(40000, 60000),
            ]);
        }

        // Create Classes
        $classes = [
            ['name' => 'Grade 1', 'section' => 'A', 'capacity' => 30, 'class_teacher_id' => 1],
            ['name' => 'Grade 2', 'section' => 'A', 'capacity' => 30, 'class_teacher_id' => 2],
            ['name' => 'Grade 3', 'section' => 'A', 'capacity' => 30, 'class_teacher_id' => 3],
        ];

        foreach ($classes as $class) {
            SchoolClass::create($class);
        }

        // Create Parent Users
        $parentUsers = [
            ['name' => 'Robert Wilson', 'email' => 'robert.wilson@email.com', 'role' => 'parent'],
            ['name' => 'Emily Davis', 'email' => 'emily.davis@email.com', 'role' => 'parent'],
            ['name' => 'David Miller', 'email' => 'david.miller@email.com', 'role' => 'parent'],
            ['name' => 'Lisa Anderson', 'email' => 'lisa.anderson@email.com', 'role' => 'parent'],
        ];

        foreach ($parentUsers as $index => $parentUser) {
            $user = User::create(array_merge($parentUser, ['password' => Hash::make('password')]));
            
            ParentModel::create([
                'user_id' => $user->id,
                'phone' => '555-' . rand(1000, 9999),
                'address' => '456 Parent Avenue, City',
                'occupation' => ['Engineer', 'Doctor', 'Teacher', 'Lawyer'][$index],
                'relationship' => ['father', 'mother', 'father', 'mother'][$index],
            ]);
        }

        // Create Student Users and Students
        $studentUsers = [
            ['name' => 'Alice Wilson', 'email' => 'alice.wilson@school.com', 'role' => 'student'],
            ['name' => 'Bob Davis', 'email' => 'bob.davis@school.com', 'role' => 'student'],
            ['name' => 'Charlie Miller', 'email' => 'charlie.miller@school.com', 'role' => 'student'],
            ['name' => 'Diana Anderson', 'email' => 'diana.anderson@school.com', 'role' => 'student'],
            ['name' => 'Ethan Thompson', 'email' => 'ethan.thompson@school.com', 'role' => 'student'],
            ['name' => 'Fiona Garcia', 'email' => 'fiona.garcia@school.com', 'role' => 'student'],
        ];

        foreach ($studentUsers as $index => $studentUser) {
            $user = User::create(array_merge($studentUser, ['password' => Hash::make('password')]));
            
            $student = Student::create([
                'user_id' => $user->id,
                'class_id' => ($index % 3) + 1, // Distribute among 3 classes
                'student_id' => 'STU' . str_pad($index + 1, 4, '0', STR_PAD_LEFT),
                'admission_number' => 'ADM' . str_pad($index + 1, 4, '0', STR_PAD_LEFT),
                'date_of_birth' => now()->subYears(rand(6, 12)),
                'gender' => $index % 2 == 0 ? 'female' : 'male',
                'address' => '789 Student Street, City',
                'phone' => '555-' . rand(1000, 9999),
                'admission_date' => now()->subMonths(rand(1, 12)),
            ]);

            // Assign parents to students
            if ($index < 4) {
                $student->parents()->attach($index + 1);
            }
        }

        // Create Sample Grades
        $students = Student::all();
        $subjects = Subject::all();

        foreach ($students as $student) {
            foreach ($subjects->take(3) as $subject) {
                Grade::create([
                    'student_id' => $student->id,
                    'subject_id' => $subject->id,
                    'exam_type' => 'midterm',
                    'marks_obtained' => rand(70, 95),
                    'total_marks' => 100,
                    'percentage' => rand(70, 95),
                    'grade' => ['A', 'B+', 'B', 'A-'][rand(0, 3)],
                    'exam_date' => now()->subDays(rand(1, 30)),
                ]);
            }
        }

        // Create Sample Attendance
        foreach ($students as $student) {
            for ($i = 0; $i < 10; $i++) {
                Attendance::create([
                    'student_id' => $student->id,
                    'class_id' => $student->class_id,
                    'date' => now()->subDays($i),
                    'status' => rand(1, 10) > 2 ? 'present' : 'absent',
                    'marked_by' => $student->schoolClass->class_teacher_id + 3, // Teacher user IDs start from 4
                ]);
            }
        }
    }
}
