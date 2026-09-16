<?php

use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::view('/', 'app');

Route::view('/login', 'app');

Route::view('/stations', 'app');

Route::view('/stations/create', 'app');

Route::view('/stations/{station}', 'app')
    ->whereNumber('station');