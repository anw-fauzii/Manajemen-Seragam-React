<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

require __DIR__ . '/auth.php';

Route::middleware(['auth', 'revalidate'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::resource('supplier', App\Http\Controllers\SupplierController::class)->except('update');
    Route::post('edit-supplier/{id}', [App\Http\Controllers\SupplierController::class, 'update']);
    Route::resource('seragam', App\Http\Controllers\SeragamController::class)->except('update');
    Route::post('edit-seragam/{id}', [App\Http\Controllers\SeragamController::class, 'update']);
    Route::resource('seragam-detail', App\Http\Controllers\SeragamDetailController::class)->except('update')->middleware(['auth']);
    Route::post('edit-seragam-detail/{id}', [App\Http\Controllers\SeragamDetailController::class, 'update']);
    Route::resource('stok-seragam', App\Http\Controllers\StokSeragamController::class);
    Route::resource('pesanan', App\Http\Controllers\PesananController::class)->except('update');
    Route::post('edit-pesanan/{id}', [App\Http\Controllers\PesananController::class, 'update']);
    Route::resource('perhitungan-harga-seragam', App\Http\Controllers\HitungHargaDasarController::class)->except('update');
    Route::post('edit-perhitungan-harga-seragam/{id}', [App\Http\Controllers\HitungHargaDasarController::class, 'update']);
    Route::resource('laporan-laba-rugi', App\Http\Controllers\LaporanLabaRugiController::class);
});


Route::resource('keranjang', App\Http\Controllers\KeranjangController::class);
Route::get('/', [App\Http\Controllers\FrontendController::class, 'welcome'])->name('welcome');
Route::get('/detail-seragam/{id}', [App\Http\Controllers\FrontendController::class, 'detail'])->name('detail');
Route::get('/checkout', [App\Http\Controllers\FrontendController::class, 'checkout'])->name('checkout');
Route::get('/data-seragam/{id}', [App\Http\Controllers\FrontendController::class, 'show'])->name('data-seragam');
Route::post('/pesan-seragam', [App\Http\Controllers\FrontendController::class, 'store'])->name('pesan-seragam');
