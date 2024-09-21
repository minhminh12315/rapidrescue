<?php

use App\Http\Controllers\AdminController;
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
Route::get('/get-hospital/{id}', [HospitalController::class, 'show'])->name('get.hospital');
Route::put('/update-hospital/{id}', [HospitalController::class, 'update'])->name('update.hospital');
Route::delete('/delete-hospital/{id}', [HospitalController::class, 'destroy'])->name('delete.hospital');
// User
Route::post('/store-user', [UserController::class, 'store']);
Route::put('/update-user/{id}', [UserController::class, 'updateRole']);
Route::get('/get-users', [UserController::class, 'index']);
Route::get('/get-user/{id}', [UserController::class, 'show']);
Route::put('/update-user/{id}', [UserController::class, 'update']);
Route::delete('/delete-user/{id}', [UserController::class, 'destroy']);


// Admin Driver
Route::get('/get-drivers', [UserController::class, 'getDrivers']);         // Lấy danh sách tài xế
Route::post('/store-driver', [UserController::class, 'storeDriver']);      // Tạo tài xế mới
Route::put('/update-driver/{id}', [UserController::class, 'updateDriver']); // Cập nhật thông tin tài xế
Route::delete('/delete-driver/{id}', [UserController::class, 'deleteDriver']); // Xóa tài xế

// Call Ambulance
Route::post('/emergency-requests', [EmergencyRequestController::class, 'store']);


// lấy vị trí tài xế
Route::get('/get-driver-location/{driverId}', [AmbulanceController::class, 'getDriverLocation']);


Route::get('/driver-requests/{driver_id}', [EmergencyRequestController::class, 'getDriverRequests']);

// EMT
Route::get('/get-emt/{id}', [UserController::class, 'getEmt']);         // Lấy danh sách EMT

// đổ dữ liệu theo id
Route::get('/get-ambulance', [AmbulanceController::class, 'index']);
Route::get('/get-ambulance/{id}', [AmbulanceController::class, 'show']);
Route::post('/store-ambulance', [AmbulanceController::class, 'store']);
Route::put('/update-ambulance/{id}', [AmbulanceController::class, 'update']);
Route::delete('/delete-ambulance/{id}', [AmbulanceController::class, 'destroy']);

//cap nhật vị trí

Route::post('/update-driver-location', [AmbulanceController::class, 'update']);


// Text
Route::get('/get-text', [TextController::class, 'index']);

Route::get('/get-image', [ImageController::class, 'index']);
Route::post('/store-image', [ImageController::class, 'store']);
Route::delete('delete-image/{id}', [ImageController::class, 'destroy']);  
Route::put('/update-image/{id}', [ImageController::class, 'update']);

Route::post('/contact', [ContactController::class, 'store']);

Route::get('/hospitals', [HospitalController::class, 'index'])->name('get.hospitals');

Route::get('/ambulances', [AmbulanceController::class, 'index'])->name('get.ambulances');

Route::get('/dashboard-stats', [AdminController::class, 'dashboardStats'])->name('dashboard.stats');