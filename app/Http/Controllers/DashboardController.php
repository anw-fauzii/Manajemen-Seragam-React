<?php

namespace App\Http\Controllers;

use App\Models\Pesanan;
use App\Models\SeragamDetail;
use App\Models\Supplier;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $pesanan = Pesanan::where('status', FALSE)->count();
        $supplier = Supplier::all()->count();
        $stok_seragam = SeragamDetail::sum('stok');
        $user = User::all()->count();
        return Inertia::render('Dashboard', [
            'pesanan' => $pesanan,
            'supplier' => $supplier,
            'stok_seragam' => $stok_seragam,
            'user' => $user,
        ]);
    }
}
