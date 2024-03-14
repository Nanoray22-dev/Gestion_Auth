<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bitacoras extends Model
{
    use HasFactory;

    protected $fillable = [
        'navegador', 
        'fecha',
        'hora'
    ];

    public static function add($navegador){
        $bitacora = Bitacoras::create([
            'navegador' => $navegador,
            'fecha' =>date('Y-m-d'),
            'hora' =>date('H:i:s')
        ]);
        return $bitacora;
    }
}
