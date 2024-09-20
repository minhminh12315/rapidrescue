<?php

use App\Http\Controllers\AmbulanceController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EmergencyRequestController;
use App\Http\Controllers\HospitalController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\TextController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VideoController;
use App\Models\Ambulance;
use App\Models\User;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/register', [AuthController::class, 'register'])->name('register');
Route::post('/check-email', [AuthController::class, 'checkEmail'])->name('check-email');
Route::get('/get-user', [AuthController::class, 'index'])->name('get.user');

Route::post('/store-hospital', [HospitalController::class, 'store'])->name('store.hospital');
Route::get('/get-hospitals', [HospitalController::class, 'index'])->name('get.hospitals');

Route::put('/update-user/{id}', [UserController::class, 'updateRole']);
// Admin Driver
Route::get('/get-drivers', [UserController::class, 'getDrivers']);         // Lấy danh sách tài xế
Route::post('/store-driver', [UserController::class, 'storeDriver']);      // Tạo tài xế mới
Route::put('/update-driver/{id}', [UserController::class, 'updateDriver']); // Cập nhật thông tin tài xế
Route::delete('/delete-driver/{id}', [UserController::class, 'deleteDriver']); // Xóa tài xế

// Call Ambulance
Route::post('/store-call-ambulance', [EmergencyRequestController::class, 'store']);
Route::post('/emergency-requests', [EmergencyRequestController::class, 'store']);

// đổ dữ liệu theo id
Route::get('/get-ambulance', [AmbulanceController::class, 'index']);

Route::get('/get-text', [TextController::class, 'index']);

Route::get('/get-image', [ImageController::class, 'index']);
Route::post('/store-image', [ImageController::class, 'store']);

Route::get('/get-video', [VideoController::class, 'index']);

Route::post('/contact', [ContactController::class, 'store']);

