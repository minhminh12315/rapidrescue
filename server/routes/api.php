<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\YourController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FeedbackController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/register', [AuthController::class, 'register'])->name('register');
Route::post('/check-email', [AuthController::class, 'checkEmail'])->name('check-email');
Route::get('/example', [YourController::class, 'example']);
Route::post('/contact', [FeedbackController::class, 'store']);

