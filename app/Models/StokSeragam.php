<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StokSeragam extends Model
{
    use HasFactory;
    protected $table = "stok_seragam";
    protected $fillable = [
        'seragam_detail_id',
        'stok',
    ];
    protected $casts = [
        'id' => 'integer',
        'seragam_detail_id' => 'integer',
    ];

    public function seragam_detail(): BelongsTo
    {
        return $this->belongsTo(SeragamDetail::class);
    }
}
