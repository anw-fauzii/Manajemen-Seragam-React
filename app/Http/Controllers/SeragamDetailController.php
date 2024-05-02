<?php

namespace App\Http\Controllers;

use App\Models\Seragam;
use App\Models\SeragamDetail;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SeragamDetailController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $supplier = Supplier::all();
        $seragam = SeragamDetail::with('seragam')->paginate(100);
        return Inertia::render('SeragamDetail/Index', [
            'title' => "Daftar Ukuran Seragam",
            'seragam' => $seragam,
            'supplier' => $supplier,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $seragam = Seragam::All();
        return Inertia::render('SeragamDetail/Create', [
            'title' => "Tambah Ukuran Seragam",
            'seragam' => $seragam,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = $request->validate([
            'ukuran' => 'required',
            'seragam_id' => 'required'
        ], [
            'ukuran.required' => "Ukuran harus diisi",
            'seragam_id.required' => "Data Seragam harus diisi",
        ]);
        $seragam = new SeragamDetail();
        $seragam->ukuran = $request->ukuran;
        $seragam->seragam_id = $request->seragam_id;
        $seragam->stok = 0;
        $seragam->save();
        return to_route('seragam-detail.index');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $seragam = SeragamDetail::with('seragam')->join('seragam', 'seragam.id', '=', 'seragam_detail.seragam_id')->where('kategori', $id)->paginate(100);
        if ($id == 1) {
            $unit = " PG";
        } elseif ($id == 2) {
            $unit = " TK";
        } elseif ($id == 3) {
            $unit = " SD";
        }
        return Inertia::render('SeragamDetail/Index', [
            'title' => "Daftar Ukuran Seragam" . $unit,
            'seragam' => $seragam,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $seragam = Seragam::All();
        $seragamDetail = SeragamDetail::findOrFail($id);
        return Inertia::render('SeragamDetail/Edit', [
            'title' => "Update Seragam " . $seragamDetail->seragam->nama_seragam,
            'seragam' => $seragam,
            'seragamDetail' => $seragamDetail,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validator = $request->validate([
            'ukuran' => 'required',
            'seragam_id' => 'required'
        ], [
            'ukuran.required' => "Ukuran harus diisi",
            'seragam_id.required' => "Data Seragam harus diisi",
        ]);
        $seragam = SeragamDetail::findOrFail($id);
        $seragam->ukuran = $request->ukuran;
        $seragam->seragam_id = $request->seragam_id;
        $seragam->update();
        return to_route('seragam-detail.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $seragam = SeragamDetail::findOrFail($id);
        $seragam->delete();
        return redirect()->back()->with('message', 'Data berhasil dihapus');
    }
}
