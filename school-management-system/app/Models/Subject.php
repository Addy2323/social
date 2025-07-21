<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    protected $fillable = [
        'name',
        'code',
        'description',
        'credits',
        'status',
    ];

    // Relationships
    public function grades()
    {
        return $this->hasMany(Grade::class);
    }
}
