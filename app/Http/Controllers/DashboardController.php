<?php

namespace App\Http\Controllers;

use App\Models\Pesanan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $pesanan = Pesanan::where('status', FALSE)->count();
        return Inertia::render('Dashboard', [
            'pesanan' => $pesanan
        ]);
    }
}
