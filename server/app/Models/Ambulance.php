<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ambulance extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'address',
        'type',
        'price',
    ];

    public function emergencyRequests()
    {
        return $this->hasMany(EmergencyRequest::class);
    }
}
