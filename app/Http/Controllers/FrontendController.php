<?php

namespace App\Http\Controllers;

use App\Models\Keranjang;
use App\Models\Pesanan;
use App\Models\PesananDetail;
use App\Models\Seragam;
use App\Models\SeragamDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Redis;
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
        $seragam = Seragam::with(['seragamDetail' => function ($query) {
            $query->select('seragam_id', DB::raw('SUM(stok) as total_stok'))
                ->groupBy('seragam_id');
        }])
            ->where('kategori', $id)
            ->select('seragam.*', DB::raw('SUM(seragam_detail.stok) as total_stok'))
            ->leftJoin('seragam_detail', 'seragam.id', '=', 'seragam_detail.seragam_id')
            ->groupBy('seragam.id')
            ->orderByRaw('total_stok DESC, total_stok = 0')
            ->get();

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

    public function detail($id, Request $request)
    {
        $keranjang = Keranjang::where('ip_pelanggan', $request->getClientIp())->get();
        $seragam = Seragam::with('seragamDetail')->findOrFail($id);
        return Inertia::render('Frontend/Detail', [
            'title' => "Daftar Seragam ",
            'keranjang' => $keranjang,
            'seragam' => $seragam
        ]);
    }

    public function store(Request $request)
    {
        $Keranjang = Keranjang::where('ip_pelanggan', $request->getClientIp())->get();
        $pesanan = Pesanan::create([
            'nama' => $request->nama,
            'kelas' => $request->kelas,
            'total_harga' => $Keranjang->sum('subtotal'),
            'ip_pelanggan' => $request->getClientIp(),
            'status' => FALSE
        ]);

        foreach ($Keranjang as $data) {
            PesananDetail::create([
                'pesanan_id' => $pesanan->id,
                'seragam_detail_id' => $data->seragam_detail_id,
                'jumlah' => $data->jumlah,
                'catatan' => $data->catatan,
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
        $pesananDetail = PesananDetail::join('pesanan', 'pesanan.id', '=', 'pesanan_detail.pesanan_id')->where('ip_pelanggan', $request->getClientIp())->where('pesanan_id', $pesanan->id)->get();
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
        $update_kode = Pesanan::findOrFail($pesanan->id);
        $update_kode->update([
            'kode_pembayaran' => $snapToken
        ]);
        return Redirect::back()->with('message', $snapToken);
    }

    public function payment_sekarang(Request $request)
    {
        $validator = $request->validate([
            'nama' => 'required',
            'kelas' => 'required',
            'jumlah' => 'required',
            'ukuran' => 'required'
        ], [
            'nama.required' => "Nama harus diisi",
            'kelas.required' => "Kelas harus diisi",
            'jumlah.required' => "Jumlah harus diisi",
            'ukuran.required' => "Ukuran seragam harus diisi",
        ]);
        $seragamDetail = SeragamDetail::with('seragam')->find($request->ukuran);
        $pesanan = Pesanan::create([
            'nama' => $request->nama,
            'kelas' => $request->kelas,
            'total_harga' => $seragamDetail->seragam->harga * $request->jumlah,
            'ip_pelanggan' => $request->getClientIp(),
            'status' => FALSE
        ]);
        PesananDetail::create([
            'pesanan_id' => $pesanan->id,
            'seragam_detail_id' => $request->ukuran,
            'jumlah' => $request->jumlah,
            'catatan' => $request->catatan,
            'subtotal' => $seragamDetail->seragam->harga * $request->jumlah,
        ]);
        $seragam = SeragamDetail::find($request->ukuran);
        $seragam->update([
            'stok' => $seragam->stok - $request->jumlah,
        ]);
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
        $pesananDetail = PesananDetail::join('pesanan', 'pesanan.id', '=', 'pesanan_detail.pesanan_id')->where('ip_pelanggan', $request->getClientIp())->where('pesanan_id', $pesanan->id)->get();
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
        $update_kode = Pesanan::findOrFail($pesanan->id);
        $update_kode->update([
            'kode_pembayaran' => $snapToken
        ]);
        return to_route('welcome')->with('message', $snapToken);
    }

    public function pesanan_costumer(Request $request)
    {
        $pesanan = Pesanan::with(
            'pesanan_detail',
            'pesanan_detail.seragam_detail',
            'pesanan_detail.seragam_detail.seragam',
        )->where('ip_pelanggan', $request->getClientIp())->get();
        $keranjang = Keranjang::where('ip_pelanggan', $request->getClientIp())->get();
        return Inertia::render('Frontend/Pesanan', [
            'keranjang' => $keranjang,
            'pesanan' => $pesanan
        ]);
    }
}
