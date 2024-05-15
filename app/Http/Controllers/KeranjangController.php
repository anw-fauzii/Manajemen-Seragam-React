<?php

namespace App\Http\Controllers;

use App\Models\Keranjang;
use App\Models\Pesanan;
use App\Models\PesananDetail;
use App\Models\Seragam;
use App\Models\SeragamDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class KeranjangController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $keranjang = Keranjang::with([
            'seragam_detail',
            'seragam_detail.seragam'
        ])->where('ip_pelanggan', $request->getClientIp())->get();
        $jumlahSubTotal = Keranjang::where('ip_pelanggan', $request->getClientIp())->sum('subtotal');
        return Inertia::render('Frontend/Keranjang', [
            'keranjang' => $keranjang,
            'jumlahSubTotal' => $jumlahSubTotal
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
        $validator = $request->validate([
            'jumlah' => 'required',
            'ukuran' => 'required'
        ], [
            'jumlah.required' => "Jumlah harus diisi",
            'ukuran.required' => "Ukuran seragam harus diisi",
        ]);
        $Keranjang = Keranjang::where('ip_pelanggan', $request->getClientIp())->where('seragam_detail_id', $request->ukuran)->first();
        $seragamDetail = SeragamDetail::with('seragam')->find($request->ukuran);
        if ($Keranjang) {
            $jumlahUpdate = $Keranjang->jumlah + $request->jumlah;
            $Keranjang->update([
                'jumlah' => $jumlahUpdate,
                'catatan' => $request->catatan,
                'subtotal' => $seragamDetail->seragam->harga * $jumlahUpdate,
            ]);
        } else {
            Keranjang::create([
                'seragam_detail_id' => $request->ukuran,
                'jumlah' => $request->jumlah,
                'catatan' => $request->catatan,
                'ip_pelanggan' => $request->getClientIp(),
                'subtotal' =>  $seragamDetail->seragam->harga * $request->jumlah,
            ]);
        }
        return to_route('welcome');
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
    public function destroy($id)
    {
        $seragam = Keranjang::findOrFail($id);
        $seragam->delete();
        return redirect()->back()->with('message', 'Data berhasil dihapus');
    }
}
