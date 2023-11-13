<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SeragamDetail extends Model
{
    use HasFactory;
    protected $table = "detail_seragam";
    protected $fillable = [
        'seragam_id',
        'ukuran',
        'stok',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        'seragam_id' => 'integer',
    ];

    public function seragam(): BelongsTo
    {
        return $this->belongsTo(Seragam::class);
    }
}
