<?php

namespace App\Http\Controllers;

use App\Models\Keranjang;
use App\Models\Seragam;
use Illuminate\Http\Request;
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
}
