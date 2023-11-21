<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PesananDetail extends Model
{
    use HasFactory;
    protected $table = 'pesanan_detail';
    protected $fillable = [
        'seragam_detail_id', 'pesanan_id', 'jumlah', 'subtotal', 'catatan', 'ip_pelanggan'
    ];

    public function seragam_detail()
    {
        return $this->belongsTo(SeragamDetail::class);
    }
    public function pesanan()
    {
        return $this->belongsTo(Pesanan::class);
    }
}
