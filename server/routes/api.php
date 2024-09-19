<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\HospitalController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/register', [AuthController::class, 'register'])->name('register');
Route::post('/check-email', [AuthController::class, 'checkEmail'])->name('check-email');

Route::post('/store-hospital', [HospitalController::class, 'store'])->name('store.hospital');
Route::get('/get-hospitals', [HospitalController::class, 'index'])->name('get.hospitals');


Route::post('/contact', [ContactController::class, 'store']);

