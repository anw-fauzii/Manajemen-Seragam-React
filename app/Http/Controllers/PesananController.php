<?php

namespace App\Http\Controllers;

use App\Models\Keranjang;
use App\Models\Pesanan;
use App\Models\PesananDetail;
use App\Models\SeragamDetail;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use PhpParser\Node\Stmt\Return_;

class PesananController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = User::find(Auth::user()->id);
        if ($user->hasRole('admin')) {
            $pesanan = Pesanan::with(
                'pesanan_detail',
                'pesanan_detail.seragam_detail',
                'pesanan_detail.seragam_detail.seragam',
            )->orderBy('id', 'DESC')->get();
            return Inertia::render('Pesanan/Index', [
                'title' => "Daftar Pesanan",
                'pesanan' => $pesanan
            ]);
        } else {
            return Inertia::render('Error/404');
        }
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
            'total_harga' => $Keranjang->sum('subtotal'),
            'status' => FALSE
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
        \Midtrans\Config::$serverKey = config('midtrans.server_key');
        \Midtrans\Config::$isProduction = false;
        \Midtrans\Config::$isSanitized = true;
        \Midtrans\Config::$is3ds = true;

        $params = array(
            'transaction_details' => array(
                'order_id' => rand(),
            ),
            'item_details' => array(),
            'customer_details' => array(
                'first_name' => $pesanan->nama,
                'last_name' => $pesanan->kelas
            ),
        );
        $pesananDetail = PesananDetail::where('ip_pelanggan', $request->getClientIp())->where('pesanan_id', $pesanan->id)->get();
        foreach ($pesananDetail as $data) {
            $item = array(
                'id' => $data->seragam_detail_id,
                'price' => $data->seragam_detail->seragam->harga,
                'quantity' => $data->jumlah,
                'name' => $data->seragam_detail->seragam->nama_seragam . " (" . $data->seragam_detail->ukuran . ")"
            );

            $params['item_details'][] = $item;
        }
        $snapToken = \Midtrans\Snap::getSnapToken($params);
        return Redirect::back()->with('message', $snapToken);
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
    public function update($id)
    {
        $user = User::find(Auth::user()->id);
        if ($user->hasRole('admin')) {
            $pesanan = Pesanan::findOrFail($id);
            $pesanan->status = "1";
            $pesanan->update();
            return to_route('pesanan.index');
        } else {
            return Inertia::render('Error/404');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
