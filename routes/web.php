<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

// Catch-all: hand all other routes to the React SPA.
// Client-side routing (react-router) resolves the path.
Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');
