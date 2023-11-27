<?php

namespace App\Http\Controllers;

use App\Models\Keranjang;
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
}
