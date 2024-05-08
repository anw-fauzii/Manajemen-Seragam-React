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

class FrontendController extends Controller
{
    public function welcome(Request $request)
    {
        $keranjang = Keranjang::where('ip_pelanggan', $request->getClientIp())->get();
        return Inertia::render('Frontend/Welcome', [
            'keranjang' => $keranjang
        ]);
    }

    public function checkout(Request $request)
    {
        $keranjang = Keranjang::where('ip_pelanggan', $request->getClientIp())->get();
        return Inertia::render('Frontend/Checkout', [
            'keranjang' => $keranjang
        ]);
    }

    public function show($id, Request $request)
    {
        $keranjang = Keranjang::where('ip_pelanggan', $request->getClientIp())->get();
        $seragam = Seragam::with('seragamDetail')->where('kategori', $id)->get();
        if ($id = 1) {
            $unit = "PG";
        } elseif ($id = 2) {
            $unit = "TK";
        } elseif ($id = 3) {
            $unit = "SD";
        }
        return Inertia::render('Frontend/Seragam', [
            'title' => "Daftar Seragam " . $unit,
            'seragam' => $seragam,
            'keranjang' => $keranjang
        ]);
    }

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
}
