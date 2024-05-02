<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
    use HasFactory;
    protected $table = "supplier";
    protected $fillable = [
        'kode',
        'nama_supplier',
        'penanggung_jawab',
        'telepon',
        'alamat'
    ];

    public static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            $model->id = Supplier::max('id') + 1;
            $model->kode = "SPLR-" . str_pad($model->id, '5', '0', STR_PAD_LEFT);
        });
    }
}
