<?php

namespace App\Http\Controllers;

use App\Models\Keranjang;
use App\Models\Seragam;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SeragamController extends Controller
{
    public function index(Request $request)
    {
        $user = User::find(Auth::user()->id);
        if ($user->hasRole('admin')) {
            $seragam = Seragam::with('seragamDetail')->paginate(100);
            return Inertia::render('Seragam/Index', [
                'title' => "Daftar Seragam",
                'seragam' => $seragam,
            ]);
        } else {
            return Inertia::render('Error/404');
        }
    }

    public function create()
    {
        $user = User::find(Auth::user()->id);
        if ($user->hasRole('admin')) {
            return Inertia::render('Seragam/Create', [
                'title' => "Tambah Data Seragam",
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
                'nama_seragam' => 'required',
                'kategori' => 'required'
            ], [
                'nama_seragam.required' => "Nama seragam harus diisi",
                'kategori.required' => "Kategori harus diisi",
            ]);
            $seragam = new Seragam();
            if ($request->file('foto')) {
                $file = $request->file('foto')->store('Foto Seragam', 'public');
                $seragam->foto = $file;
            }
            $seragam->nama_seragam = $request->nama_seragam;
            $seragam->kategori = $request->kategori;
            $seragam->save();
            return to_route('seragam.index');
        } else {
            return Inertia::render('Error/404');
        }
    }

    public function show($id)
    {
        $user = User::find(Auth::user()->id);
        if ($user->hasRole('admin')) {
            $seragam = Seragam::with('seragamDetail')->where('kategori', $id)->paginate(100);
            if ($id == 1) {
                $unit = " PG";
            } elseif ($id == 2) {
                $unit = " TK";
            } elseif ($id == 3) {
                $unit = " SD";
            }
            return Inertia::render('Seragam/Index', [
                'title' => "Daftar Seragam" . $unit,
                'seragam' => $seragam,
            ]);
        } else {
            return Inertia::render('Error/404');
        }
    }

    public function edit($id)
    {
        $user = User::find(Auth::user()->id);
        if ($user->hasRole('admin')) {
            $seragam = Seragam::findOrFail($id);
            return Inertia::render('Seragam/Edit', [
                'title' => "Update Seragam " . $seragam->nama_seragam,
                'seragam' => $seragam,
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
                'nama_seragam' => 'required',
                'kategori' => 'required'
            ], [
                'nama_seragam.required' => "Nama seragam harus diisi",
                'kategori.required' => "Kategori harus diisi",
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
            $seragam->kategori = $request->kategori;
            $seragam->update();
            return to_route('seragam.index');
        } else {
            return Inertia::render('Error/404');
        }
    }

    public function destroy($id)
    {
        $user = User::find(Auth::user()->id);
        if ($user->hasRole('admin')) {
            $seragam = Seragam::findOrFail($id);
            if ($seragam->foto) {
                if ($seragam->foto && file_exists(storage_path('app/public/' . $seragam->foto))) {
                    Storage::delete('public/' . $seragam->foto);
                }
            }
            $seragam->delete();
            return redirect()->back()->with('message', 'Data berhasil dihapus');
        } else {
            return Inertia::render('Error/404');
        }
    }
}
