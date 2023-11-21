<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Keranjang extends Model
{
    use HasFactory;
    protected $table = 'keranjang';
    protected $fillable = [
        'seragam_detail_id', 'jumlah', 'subtotal', 'catatan', 'ip_pelanggan'
    ];

    public function seragam_detail()
    {
        return $this->belongsTo(SeragamDetail::class);
    }
}
