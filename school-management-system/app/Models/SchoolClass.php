<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SchoolClass extends Model
{
    protected $fillable = [
        'name',
        'section',
        'capacity',
        'teacher_id',
        'description',
        'status',
    ];
        /**
     * Get the students for the school class.
     */
      /**
     * Get the students for the school class.
     */
    public function students()
    {
        return $this->hasMany(\App\Models\Student::class, 'class_id');
    }

    // Relationships
    public function teacher()
    {
        return $this->belongsTo(\App\Models\Teacher::class, 'teacher_id');
    }



    public function attendances()
    {
        return $this->hasMany(Attendance::class, 'class_id');
    }
}
