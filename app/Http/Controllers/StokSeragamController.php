<?php

namespace App\Http\Controllers;

use App\Models\Seragam;
use App\Models\SeragamDetail;
use App\Models\StokSeragam;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StokSeragamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $pemasukan = StokSeragam::with(
            'seragam_detail',
            'seragam_detail.seragam'
        )->paginate(100);
        return Inertia::render('Pemasukan/Index', [
            'title' => "Daftar Pemasukan",
            'pemasukan' => $pemasukan,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'stok' => 'required',
        ], [
            'stok.required' => "Stok harus diisi",
        ]);

        $seragam = SeragamDetail::find($request->id);
        $seragam->stok += $request->stok;
        $seragam->update();

        $stok = StokSeragam::firstOrNew(
            [
                'seragam_detail_id' => $seragam->id,
                'created_at' => now()->toDateString(),
            ]
        );

        $stok->supplier_id = $request->supplier_id;
        $stok->stok += $request->stok;

        if ($stok->exists) {
            $stok->update();
        } else {
            $stok->save();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
