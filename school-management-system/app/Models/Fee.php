<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Fee extends Model
{
    protected $fillable = [
        'student_id',
        'fee_type',
        'amount',
        'due_date',
        'paid_date',
        'status',
        'payment_method',
        'remarks',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'due_date' => 'date',
        'paid_date' => 'date',
    ];

    // Relationships
    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}
