<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Seragam extends Model
{
    use HasFactory;
    protected $table = "seragam";
    protected $fillable = [
        'nama_seragam',
        'kategori',
        'foto',
        'harga',
        'harga_dasar'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
    ];

    public function seragamDetails(): HasMany
    {
        return $this->hasMany(SeragamDetail::class);
    }
}
