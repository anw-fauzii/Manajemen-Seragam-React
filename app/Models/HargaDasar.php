<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HargaDasar extends Model
{
    use HasFactory;
    protected $table = 'harga_dasar';
    protected $fillable = [
        'seragam_id', 'jenis_kain', 'ongkos', 'logo', 'keuntungan'
    ];

    public function seragam()
    {
        return $this->belongsTo(Seragam::class);
    }
}
