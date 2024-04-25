<?php

namespace App\Http\Controllers;

use App\Models\HargaDasar;
use App\Models\Seragam;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HitungHargaDasarController extends Controller
{
    public function index(Request $request)
    {
        $HargaDasar = HargaDasar::with('seragam')->paginate(100);
        return Inertia::render('HargaDasar/Index', [
            'title' => "Harga Seragam",
            'HargaDasar' => $HargaDasar,
        ]);
    }

    public function create()
    {
        $seragam = Seragam::where('harga', NULL)->get();
        return Inertia::render('HargaDasar/Create', [
            'title' => "Tambah Harga Seragam",
            'seragam' => $seragam,
        ]);
    }

    public function store(Request $request)
    {
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
    }

    public function edit($id)
    {
        $seragam = Seragam::where('harga', NULL)->get();
        $HargaDasar = HargaDasar::findOrFail($id);
        return Inertia::render('HargaDasar/Edit', [
            'title' => "Update Harga " . $HargaDasar->seragam->nama_seragam,
            'seragam' => $seragam,
            'HargaDasar' => $HargaDasar,
        ]);
    }

    public function update(Request $request, $id)
    {
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
    }

    public function destroy($id)
    {
        $seragam = HargaDasar::findOrFail($id);
        $seragam->delete();
        $seragam = Seragam::findOrFail($seragam->seragam_id);
        $seragam->harga_dasar = NULL;
        $seragam->harga = NULL;
        $seragam->update();
        return redirect()->back()->with('message', 'Data berhasil dihapus');
    }
}
