<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('enlaces', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('pagina_id');
            $table->unsignedBigInteger('rol_id');
            $table->string('descripcion');
            $table->timestamp('fechacreacion')->useCurrent();
            $table->timestamp('fechamodificacion')->useCurrent();
            $table->string('usuariocreacion');
            $table->string('usuariomodificacion');

            $table->foreign('pagina_id')->references('id')->on('paginas');
            $table->foreign('rol_id')->references('id')->on('roles');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('enlaces');
    }
};
