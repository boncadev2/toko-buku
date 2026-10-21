<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

// Handler aman untuk file publik storage dengan perlindungan Path Traversal (LFI)
$serveStorageFile = function (string $path) {
    // Normalisasi direktori dasar public storage
    $baseDir = realpath(storage_path('app/public'));
    if (!$baseDir) {
        abort(404);
    }

    // Hindari file tersembunyi / dotfiles (e.g. .env, .htaccess)
    if (str_contains($path, '/.') || str_starts_with($path, '.')) {
        abort(404);
    }

    $targetPath = storage_path('app/public/' . $path);
    $realPath = realpath($targetPath);

    // Wajib ada dan wajib berada di dalam base directory
    if (!$realPath || !str_starts_with($realPath, $baseDir . DIRECTORY_SEPARATOR)) {
        abort(404);
    }

    if (!is_file($realPath)) {
        abort(404);
    }

    return response()->file($realPath);
};

Route::get('/media/{path}', $serveStorageFile)->where('path', '.*');
Route::get('/storage/{path}', $serveStorageFile)->where('path', '.*');
