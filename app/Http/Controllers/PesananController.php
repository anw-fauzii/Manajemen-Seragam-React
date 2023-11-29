<?php

namespace App\Http\Controllers;

use App\Models\Keranjang;
use App\Models\Pesanan;
use App\Models\PesananDetail;
use App\Models\SeragamDetail;
use Illuminate\Http\Request;

class PesananController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
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
        $Keranjang = Keranjang::where('ip_pelanggan', $request->getClientIp())->get();
        $pesanan = Pesanan::create([
            'nama' => $request->nama,
            'kelas' => $request->kelas,
            'total_harga' => $Keranjang->sum('subtotal')
        ]);
        foreach ($Keranjang as $data) {
            PesananDetail::create([
                'pesanan_id' => $pesanan->id,
                'seragam_detail_id' => $data->seragam_detail_id,
                'jumlah' => $data->jumlah,
                'catatan' => $data->catatan,
                'ip_pelanggan' => $data->ip_pelanggan,
                'subtotal' => $data->subtotal
            ]);
            $seragam = SeragamDetail::find($data->seragam_detail_id);
            $seragam->update([
                'stok' => $seragam->stok - $data->jumlah,
            ]);
        }
        Keranjang::where('ip_pelanggan', $request->getClientIp())->delete();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
