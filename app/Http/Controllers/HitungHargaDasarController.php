<?php

namespace App\Http\Controllers;

use App\Models\HargaDasar;
use App\Models\Seragam;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;


class HitungHargaDasarController extends Controller
{

    public function index(Request $request)
    {
        $user = User::find(Auth::user()->id);
        $user = User::find(Auth::user()->id);
        if ($user->hasRole('admin')) {
            $HargaDasar = HargaDasar::with('seragam')->paginate(100);
            return Inertia::render('HargaDasar/Index', [
                'title' => "Harga Seragam",
                'HargaDasar' => $HargaDasar,
            ]);
        } else {
            return Inertia::render('Error/404');
        }
    }

    public function create()
    {
        $user = User::find(Auth::user()->id);
        if ($user->hasRole('admin')) {
            $seragam = Seragam::where('harga', NULL)->get();
            return Inertia::render('HargaDasar/Create', [
                'title' => "Tambah Harga Seragam",
                'seragam' => $seragam,
            ]);
        } else {
            return Inertia::render('Error/404');
        }
    }

    public function store(Request $request)
    {
        $user = User::find(Auth::user()->id);
        if ($user->hasRole('admin')) {
            $validator = $request->validate([
                'seragam_id' => 'required',
                'jenis_kain' => 'required',
                'ongkos' => 'required',
                'logo' => 'required',
                'keuntungan' => 'required',
            ]);

            $HargaDasar = new HargaDasar();
            $HargaDasar->seragam_id = $request->seragam_id;
            $HargaDasar->jenis_kain = $request->jenis_kain;
            $HargaDasar->ongkos = $request->ongkos;
            $HargaDasar->logo = $request->logo;
            $HargaDasar->keuntungan = $request->keuntungan;
            $HargaDasar->save();

            $hargaAwal = $request->jenis_kain + $request->ongkos + $request->logo;
            $keuntungan = ($request->keuntungan / 100) * $hargaAwal;
            $totalKeuntungan = $keuntungan + $hargaAwal;
            $seragam = Seragam::findOrFail($request->seragam_id);
            $seragam->harga_dasar = $hargaAwal;
            $seragam->harga = $totalKeuntungan;
            $seragam->update();
            return to_route('perhitungan-harga-seragam.index');
        } else {
            return Inertia::render('Error/404');
        }
    }

    public function show($id)
    {
        $user = User::find(Auth::user()->id);
        if ($user->hasRole('admin')) {
            $HargaDasar = HargaDasar::with('seragam')->join('seragam', 'seragam.id', '=', 'harga_dasar.seragam_id')->where('kategori', $id)->paginate(100);
            if ($id == 1) {
                $unit = " PG";
            } elseif ($id == 2) {
                $unit = " TK";
            } elseif ($id == 3) {
                $unit = " SD";
            }
            return Inertia::render('HargaDasar/Index', [
                'title' => "Harga Seragam" . $unit,
                'HargaDasar' => $HargaDasar,
            ]);
        } else {
            return Inertia::render('Error/404');
        }
    }

    public function edit($id)
    {
        $user = User::find(Auth::user()->id);
        if ($user->hasRole('admin')) {
            $seragam = Seragam::where('harga', NULL)->get();
            $HargaDasar = HargaDasar::findOrFail($id);
            return Inertia::render('HargaDasar/Edit', [
                'title' => "Update Harga " . $HargaDasar->seragam->nama_seragam,
                'seragam' => $seragam,
                'HargaDasar' => $HargaDasar,
            ]);
        } else {
            return Inertia::render('Error/404');
        }
    }

    public function update(Request $request, $id)
    {
        $user = User::find(Auth::user()->id);
        if ($user->hasRole('admin')) {
            $validator = $request->validate([
                'jenis_kain' => 'required',
                'ongkos' => 'required',
                'logo' => 'required',
                'keuntungan' => 'required',
            ]);

            $HargaDasar = HargaDasar::findOrFail($id);
            $HargaDasar->jenis_kain = $request->jenis_kain;
            $HargaDasar->ongkos = $request->ongkos;
            $HargaDasar->logo = $request->logo;
            $HargaDasar->keuntungan = $request->keuntungan;
            $HargaDasar->update();

            $hargaAwal = $request->jenis_kain + $request->ongkos + $request->logo;
            $keuntungan = ($request->keuntungan / 100) * $hargaAwal;
            $totalKeuntungan = $keuntungan + $hargaAwal;

            $seragam = Seragam::findOrFail($request->seragam_id);
            $seragam->harga_dasar = $hargaAwal;
            $seragam->harga = $totalKeuntungan;
            $seragam->update();
            return to_route('perhitungan-harga-seragam.index');
        } else {
            return Inertia::render('Error/404');
        }
    }

    public function destroy($id)
    {
        $user = User::find(Auth::user()->id);
        if ($user->hasRole('admin')) {
            $seragam = HargaDasar::findOrFail($id);
            $seragam->delete();
            $seragam = Seragam::findOrFail($seragam->seragam_id);
            $seragam->harga_dasar = NULL;
            $seragam->harga = NULL;
            $seragam->update();
            return redirect()->back()->with('message', 'Data berhasil dihapus');
        } else {
            return Inertia::render('Error/404');
        }
    }
}
