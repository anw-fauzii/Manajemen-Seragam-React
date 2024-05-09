<?php

namespace App\Http\Controllers;

use App\Models\Pesanan;
use App\Models\SeragamDetail;
use App\Models\Supplier;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = User::find(Auth::user()->id);
        if ($user->hasRole('admin')) {

            $bulan_pesanan = Pesanan::where('status', false)
                ->select(DB::raw('YEAR(created_at) as year'), DB::raw('MONTH(created_at) as month'), DB::raw('COUNT(*) as total'))
                ->groupBy(DB::raw('YEAR(created_at)'), DB::raw('MONTH(created_at)'))
                ->get();

            // Initialize an array to hold the formatted data
            $seriesData = [];

            // Loop through each item in $jumlah_pesanan and format it for Highcharts
            foreach ($bulan_pesanan as $item) {
                // Define month names (optional, you can also use month numbers directly)
                $monthNames = [
                    1 => 'Januari',
                    2 => 'Februari',
                    3 => 'Maret',
                    4 => 'April',
                    5 => 'Mei',
                    6 => 'Juni',
                    7 => 'Juli',
                    8 => 'Agustus',
                    9 => 'September',
                    10 => 'Oktober',
                    11 => 'November',
                    12 => 'Desember',
                ];

                // Format the data into an associative array with 'name' and 'data' keys
                $seriesData[$item->year][] = [
                    'name' => $monthNames[$item->month], // Month name
                    'data' => [(int) $item->total] // Total orders for the month
                ];
            }

            $jumlah_pesanan = Pesanan::where('status', FALSE)->count();
            $pesanan = Pesanan::with(
                'pesanan_detail',
                'pesanan_detail.seragam_detail',
                'pesanan_detail.seragam_detail.seragam',
            )->latest()->take(10)->get();
            $supplier = Supplier::all()->count();
            $stok_seragam = SeragamDetail::sum('stok');
            $user = User::all()->count();
            return Inertia::render('Dashboard', [
                'jumlah_pesanan' => $jumlah_pesanan,
                'supplier' => $supplier,
                'stok_seragam' => $stok_seragam,
                'user' => $user,
                'pesanan' => $pesanan,
                'seriesData' => $seriesData
            ]);
        } else {
            return Inertia::render('Error/404');
        }
    }
}
