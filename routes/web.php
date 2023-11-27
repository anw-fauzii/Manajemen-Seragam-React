<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
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

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';

Route::resource('seragam', App\Http\Controllers\SeragamController::class)->except('update')->middleware(['auth']);
Route::post('edit-seragam/{id}', [App\Http\Controllers\SeragamController::class, 'update']);
Route::resource('seragam-detail', App\Http\Controllers\SeragamDetailController::class)->except('update')->middleware(['auth']);
Route::post('edit-seragam-detail/{id}', [App\Http\Controllers\SeragamDetailController::class, 'update']);
Route::resource('stok-seragam', App\Http\Controllers\StokSeragamController::class);
Route::resource('keranjang', App\Http\Controllers\KeranjangController::class);

Route::get('/', [App\Http\Controllers\FrontendController::class, 'welcome'])->name('welcome');
