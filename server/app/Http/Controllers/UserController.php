<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
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
    
        // Cập nhật thông tin mà chỉ giữ lại status
        $driver->first_name = $request->first_name ?? $driver->first_name;
        $driver->last_name = $request->last_name ?? $driver->last_name;
        $driver->email = $request->email ?? $driver->email;
        $driver->phone = $request->phone ?? $driver->phone;
        // Chỉ cập nhật status nếu có giá trị mới
        $driver->status = $request->status ?? $driver->status;
    
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

    public function index()
    {
        try {
            $users = User::all();
            return response()->json(['users' => $users], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Unable to fetch users.', 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * Store a newly created user in storage.
     */
    public function store(Request $request)
    {
        Log::info($request->all());
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'phone' => 'required|string|max:20',
        ]);

        try {
            $user = User::create([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'email' => $request->email,
                'phone' => $request->phone,
                'role' => 'customer',
                'password' => Hash::make('password'), // Mã hóa mật khẩu
            ]);
    
            return response()->json($user, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Unable to create user.', 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * Update the specified user in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'role' => 'required|string|in:admin,customer,driver,emt',
        ]);

        try {
            $user = User::findOrFail($id);
            $user->role = $request->role;
            $user->save();

            return response()->json($user, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Unable to update user.', 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified user from storage.
     */
    public function destroy($id)
    {
        try {
            $user = User::findOrFail($id);
            $user->delete();

            return response()->json(['message' => 'User deleted successfully.'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Unable to delete user.', 'message' => $e->getMessage()], 500);
        }
    }
}
