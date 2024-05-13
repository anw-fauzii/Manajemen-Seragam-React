<?php

namespace App\Http\Controllers;

use App\Models\Seragam;
use App\Models\SeragamDetail;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LaporanLabaRugiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $total_hpp = 0;
        $total_penjualan = 0;
        $seragam = Seragam::with('seragamDetail')->paginate(100);
        foreach ($seragam as $data) {
            $total_stok = $data->seragamDetail()->sum('stok');
            $hpp = $total_stok * $data->harga_dasar;
            $penjualan = $total_stok * $data->harga;
            $total_hpp += $hpp;
            $total_penjualan += $penjualan;
        }
        return Inertia::render('LabaRugi/Index', [
            'title' => "Laporan Laba Rugi",
            'seragam' => $seragam,
            'total_hpp' => $total_hpp,
            'total_penjualan' => $total_penjualan,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $total_hpp = 0;
        $total_penjualan = 0;
        $seragam = Seragam::with('seragamDetail')->where('kategori', $id)->paginate(100);
        if ($id == 1) {
            $unit = " PG";
        } elseif ($id == 2) {
            $unit = " TK";
        } elseif ($id == 3) {
            $unit = " SD";
        }
        foreach ($seragam as $data) {
            $total_stok = $data->seragamDetail()->sum('stok');
            $hpp = $total_stok * $data->harga_dasar;
            $penjualan = $total_stok * $data->harga;
            $total_hpp += $hpp;
            $total_penjualan += $penjualan;
        }
        return Inertia::render('LabaRugi/Index', [
            'title' => "Laporan Laba Rugi" . $unit,
            'seragam' => $seragam,
            'total_hpp' => $total_hpp,
            'total_penjualan' => $total_penjualan,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
