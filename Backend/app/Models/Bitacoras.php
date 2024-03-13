<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bitacoras extends Model
{
    use HasFactory;

    protected $fillable = [
        'bitacora', // Add bitacora to the fillable array
        // Add other fillable attributes here if needed
    ];
}
