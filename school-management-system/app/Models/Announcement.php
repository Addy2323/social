<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Announcement extends Model
{
    protected $fillable = [
        'title',
        'content',
        'priority',
        'target_audience',
        'status',
        'created_by',
        'publish_date',
        'expiry_date',
    ];

    protected $casts = [
        'publish_date' => 'date',
        'expiry_date' => 'date',
    ];

    // Relationships
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
