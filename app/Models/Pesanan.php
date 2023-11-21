<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pesanan extends Model
{
    use HasFactory;
    protected $table = 'pesanan';
    protected $fillable = [
        'kode', 'nama', 'kelas', 'total_harga', 'status'
    ];

    public static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            $model->id = Pesanan::max('id') + 1;
            $model->kode = "PSPI-" . str_pad($model->id, '5', '0', STR_PAD_LEFT);
        });
    }

    public function pesanan_detail()
    {
        return $this->hasMany(PesananDetail::class);
    }
}
