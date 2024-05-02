<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SupplierController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $supplier = Supplier::paginate(100);
        return Inertia::render('Supplier/Index', [
            'title' => "Daftar Supplier",
            'supplier' => $supplier,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Supplier/Create', [
            'title' => "Tambah Supplier",
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = $request->validate([
            'nama_supplier' => 'required',
            'penanggung_jawab' => 'required',
            'alamat' => 'required',
            'telepon' => 'required'
        ], [
            'nama_supplier.required' => "Nama supplier harus diisi",
            'penanggung_jawab.required' => "Kategori harus diisi",
            'alamat.required' => "Nama supplier harus diisi",
            'telepon.required' => "Kategori harus diisi",
        ]);
        $supplier = new Supplier();
        $supplier->nama_supplier = $request->nama_supplier;
        $supplier->penanggung_jawab = $request->penanggung_jawab;
        $supplier->alamat = $request->alamat;
        $supplier->telepon = $request->telepon;
        $supplier->save();
        return to_route('supplier.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Supplier $supplier)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $supplier = Supplier::findOrFail($id);
        return Inertia::render('Supplier/Edit', [
            'title' => "Edit Data Supplier",
            'supplier' => $supplier,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validator = $request->validate([
            'nama_supplier' => 'required',
            'penanggung_jawab' => 'required',
            'alamat' => 'required',
            'telepon' => 'required'
        ], [
            'nama_supplier.required' => "Nama supplier harus diisi",
            'penanggung_jawab.required' => "Kategori harus diisi",
            'alamat.required' => "Nama supplier harus diisi",
            'telepon.required' => "Kategori harus diisi",
        ]);
        $supplier = Supplier::findOrFail($id);
        $supplier->nama_supplier = $request->nama_supplier;
        $supplier->penanggung_jawab = $request->penanggung_jawab;
        $supplier->alamat = $request->alamat;
        $supplier->telepon = $request->telepon;
        $supplier->update();
        return to_route('supplier.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $supplier = Supplier::findOrFail($id);
        $supplier->delete();
        return redirect()->back()->with('message', 'Data berhasil dihapus');
    }
}
