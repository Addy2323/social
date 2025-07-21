<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    protected $fillable = [
        'user_id',
        'class_id',
        'student_id',
        'admission_number',
        'date_of_birth',
        'gender',
        'address',
        'phone',
        'admission_date',
        'status',
    ];

    protected $casts = [
        'date_of_birth' => 'date',
        'admission_date' => 'date',
    ];

        /**
     * The "booted" method of the model.
     *
     * @return void
     */
    protected static function booted(): void
    {
        static::creating(function (Student $student) {
            // Find the last student to determine the next ID
            $lastStudent = Student::latest('id')->first();

            if ($lastStudent && $lastStudent->student_id) {
                // Extract the numeric part, increment it
                $numericPart = (int) substr($lastStudent->student_id, 4);
                $newNumericPart = $numericPart + 1;
            } else {
                // If no students exist, start from 1
                $newNumericPart = 1;
            }

            // Format the new ID (e.g., STU-0001) and assign it
            $student->student_id = 'STU-' . str_pad($newNumericPart, 4, '0', STR_PAD_LEFT);
        });
    }

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function schoolClass()
    {
        return $this->belongsTo(SchoolClass::class, 'class_id');
    }

    public function parents()
    {
        return $this->belongsToMany(ParentModel::class, 'parent_student', 'student_id', 'parent_id');
    }

    public function grades()
    {
        return $this->hasMany(Grade::class);
    }

    public function attendances()
    {
        return $this->hasMany(Attendance::class);
    }
}
