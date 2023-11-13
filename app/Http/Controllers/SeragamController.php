<?php

namespace App\Http\Controllers;

use App\Models\Seragam;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SeragamController extends Controller
{
    public function index(Request $request)
    {
        $seragam = Seragam::paginate($request->perpage ?? 10);
        return Inertia::render('Seragam/Index', [
            'title' => "Daftar Seragam",
            'seragam' => $seragam,
        ]);
    }

    public function create()
    {
        return Inertia::render('Seragam/Create', [
            'title' => "Tambah Data Seragam",
        ]);
    }

    public function store(Request $request)
    {
        $validator = $request->validate([
            'nama_seragam' => 'required',
            'harga' => ['required', 'max:11'],
            'kategori' => 'required'
        ], [
            'nama_seragam.required' => "Nama seragam harus diisi",
            'harga.required' => "Harga harus diisi",
            'kategori.required' => "Kategori harus diisi",
            'harga.max' => "Maksimal input"
        ]);
        $seragam = new Seragam();
        if ($request->file('foto')) {
            $file = $request->file('foto')->store('Foto Seragam', 'public');
            $seragam->foto = $file;
        }
        $seragam->nama_seragam = $request->nama_seragam;
        $seragam->harga = $request->harga;
        $seragam->kategori = $request->kategori;
        $seragam->save();
        return to_route('seragam.index');
    }

    public function show($id)
    {
        $seragam = Seragam::where('kategori', $id)->get();
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
        ]);
    }

    public function edit($id)
    {
        $seragam = Seragam::findOrFail($id);
        return Inertia::render('Seragam/Edit', [
            'title' => "Update Seragam " . $seragam->nama_seragam,
            'seragam' => $seragam,
        ]);
    }

    public function update(Request $request, $id)
    {
        $validator = $request->validate([
            'nama_seragam' => 'required',
            'harga' => ['required', 'max:11'],
            'kategori' => 'required'
        ], [
            'nama_seragam.required' => "Nama seragam harus diisi",
            'harga.required' => "Harga harus diisi",
            'kategori.required' => "Kategori harus diisi",
            'harga.max' => "Maksimal input"
        ]);
        $seragam = Seragam::findOrFail($id);
        if ($request->file('foto')) {
            if ($seragam->foto && file_exists(storage_path('app/public/' . $seragam->foto))) {
                Storage::delete('public/' . $seragam->foto);
            }
            $file = $request->file('foto')->store('Foto Seragam', 'public');
            $seragam->foto = $file;
        }
        $seragam->nama_seragam = $request->nama_seragam;
        $seragam->harga = $request->harga;
        $seragam->kategori = $request->kategori;
        $seragam->update();
        return to_route('seragam.index');
    }

    public function destroy($id)
    {
        $seragam = Seragam::findOrFail($id);
        if ($seragam->foto) {
            if ($seragam->foto && file_exists(storage_path('app/public/' . $seragam->foto))) {
                Storage::delete('public/' . $seragam->foto);
            }
        }
        $seragam->delete();
        return redirect()->back()->with('message', 'Data berhasil dihapus');
    }
}
