<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    protected $fillable = [
        'user_id',
        'employee_id',
        'phone',
        'address',
        'qualification',
        'specialization',
        'hire_date',
        'salary',
        'status',
    ];
        /**
     * Get the classes for the teacher.
     */
    public function schoolClasses()
    {
        return $this->hasMany(\App\Models\SchoolClass::class);
    }

    protected $casts = [
        'hire_date' => 'date',
        'salary' => 'decimal:2',
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function classes()
    {
        return $this->hasMany(SchoolClass::class, 'class_teacher_id');
    }
}
