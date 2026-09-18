<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

// Route sementara untuk setup di Shared Hosting tanpa Terminal
Route::get('/setup-database', function () {
    try {
        \Illuminate\Support\Facades\Artisan::call('migrate:fresh', [
            '--seed' => true,
            '--force' => true
        ]);
        return "Database berhasil dibuat dan diisi data (Migration & Seeder Sukses)!";
    } catch (\Exception $e) {
        return "Terjadi Kesalahan: " . $e->getMessage();
    }
});

Route::get('/clear-cache', function () {
    \Illuminate\Support\Facades\Artisan::call('optimize:clear');
    return "Cache berhasil dibersihkan!";
});
