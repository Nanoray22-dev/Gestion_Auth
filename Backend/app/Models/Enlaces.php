<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Enlaces extends Model
{
    use HasFactory;

    protected $fillable = [
        'pagina_id',
        'rol_id',
        'descripcion',
    ];

    public function pagina()
    {
        return $this->belongsTo(Paginas::class);
    }

    public function rol()
    {
        return $this->belongsTo(Roles::class);
    }
}
