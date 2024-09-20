<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    public function getDrivers()
    {
        $drivers = User::where('role', 'driver')->get();
        Log::info($drivers);
        return response()->json($drivers);
    }

    public function storeDriver(Request $request)
    {
        $driver = new User;
        $driver->first_name = $request->first_name;
        $driver->last_name = $request->last_name;
        $driver->email = $request->email;
        $driver->phone = $request->phone;
        $driver->role = 'driver';  // Gán role là driver
        $driver->status = 'active';
        $driver->password = bcrypt($request->password); // Mã hóa password
        $driver->save();

        return response()->json(['message' => 'Driver created successfully', 'driver' => $driver]);
    }

    // Cập nhật thông tin tài xế
    public function updateDriver(Request $request, $id)
    {
        $driver = User::find($id);
        if (!$driver || $driver->role !== 'driver') {
            return response()->json(['message' => 'Driver not found'], 404);
        }

        $driver->first_name = $request->first_name;
        $driver->last_name = $request->last_name;
        $driver->email = $request->email;
        $driver->phone = $request->phone;
        $driver->status = $request->status ?? $driver->status; // Cập nhật status nếu có
        $driver->save();

        return response()->json(['message' => 'Driver updated successfully', 'driver' => $driver]);
    }

    // Xóa tài xế
    public function deleteDriver($id)
    {
        $driver = User::find($id);
        if (!$driver || $driver->role !== 'driver') {
            return response()->json(['message' => 'Driver not found'], 404);
        }

        $driver->delete();

        return response()->json(['message' => 'Driver deleted successfully']);
    }

    public function updateRole(Request $request, $id)
    {
        // Validate dữ liệu request
        $request->validate([
            'role' => 'required|string|max:255',
        ]);

        try {
            // Tìm user theo ID
            $user = User::findOrFail($id);

            // Cập nhật role
            $user->role = $request->input('role');
            $user->save();

            return response()->json([
                'success' => true,
                'message' => 'Role updated successfully',
                'user' => $user,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'User not found or update failed',
                'error' => $e->getMessage(),
            ], 400);
        }
    }
    public function deleteUser($id){
        try {
            $user = User::find($id);
            $user->delete();

            return response()->json([
               'success' => true,
               'message' => 'User deleted successfully',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
               'success' => false,
               'message' => 'User not found',
                'error' => $e->getMessage(),
            ], 404);
        }
    }
}
