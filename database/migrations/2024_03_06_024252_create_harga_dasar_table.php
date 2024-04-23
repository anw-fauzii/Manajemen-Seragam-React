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
        Schema::disableForeignKeyConstraints();

        Schema::create('harga_dasar', function (Blueprint $table) {
            $table->id();
            $table->foreignId('seragam_id')->constrained();
            $table->integer('jenis_kain');
            $table->integer('ongkos');
            $table->integer('logo');
            $table->integer('keuntungan');
            $table->timestamps();
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('harga_dasar');
    }
};
