<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmergencyRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'hospital_id',
        'phone',
        'type',
        'status',
        'ambulance_id',
        'start_location',
        'destination'
    ];

    public function ambulance()
    {
        return $this->belongsTo(Ambulance::class);
    }

    public function hospital()
    {
        return $this->belongsTo(Hospital::class);
    }
}
