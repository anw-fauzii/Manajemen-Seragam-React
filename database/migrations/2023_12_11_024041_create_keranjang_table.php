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

        Schema::create('keranjang', function (Blueprint $table) {
            $table->id();
            $table->foreignId('seragam_detail_id')->constrained();
            $table->integer('jumlah');
            $table->integer('subtotal');
            $table->string('catatan')->nullable();
            $table->string('ip_pelanggan');
            $table->timestamps();
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('keranjang');
    }
};
