<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Paginas extends Model
{
    use HasFactory;

    // Los campos que pueden ser asignados en masa
    protected $fillable = [
        'nombre', 'url', 'descripcion', 'icono', 'tipo',
    ];

}
