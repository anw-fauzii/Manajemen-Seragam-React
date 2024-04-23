<?php

namespace App\Http\Controllers;

use App\Models\HargaDasar;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HitungHargaDasarController extends Controller
{
    public function index(Request $request)
    {
        $HargaDasar = HargaDasar::with('seragamDetails')->paginate(100);
        return Inertia::render('HargaDasar/Index', [
            'title' => "Perhitungan Seragam",
            'HargaDasar' => $HargaDasar,
        ]);
    }
}
