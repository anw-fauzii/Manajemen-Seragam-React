<?php

namespace App\Http\Controllers;

use App\Models\Keranjang;
use App\Models\SeragamDetail;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KeranjangController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $keranjang = Keranjang::where('ip_pelanggan', $request->getClientIp())->get();
        return Inertia::render('Frontend/Keranjang', [
            'keranjang' => $keranjang,
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
        $seragam = SeragamDetail::where('ukuran', $request->ukuran[$request->seragam_id])
            ->where('seragam_id', $request->seragam_id)->first();
        $Keranjang = Keranjang::where('ip_pelanggan', $request->getClientIp())
            ->where('seragam_detail_id', $seragam->id)->first();
        if ($Keranjang) {
            $jumlahUpdate = $Keranjang->jumlah + $request->jumlah;
            $Keranjang->update([
                'jumlah' => $jumlahUpdate,
                'catatan' => $request->catatan,
                'subtotal' => $seragam->harga * $jumlahUpdate,
            ]);
        } else {
            Keranjang::create([
                'seragam_detail_id' => $seragam->id,
                'jumlah' => $request->jumlah,
                'catatan' => $request->catatan,
                'ip_pelanggan' => $request->getClientIp(),
                'subtotal' => $seragam->harga * $request->jumlah,
            ]);
        }
        return redirect()->back()->with('success', 'Data berhasil disimpan');
    }

    /**
     * Display the specified resource.
     */
    public function show(Keranjang $keranjang)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Keranjang $keranjang)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Keranjang $keranjang)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Keranjang $keranjang)
    {
        //
    }
}
