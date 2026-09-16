<?php

use App\Http\Controllers\Api\StationController;
use Illuminate\Support\Facades\Route;

Route::apiResource('stations', StationController::class)
    ->only([
        'index',
        'store',
        'show',
    ]);