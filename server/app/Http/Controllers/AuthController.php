<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function profile(Request $request)
    {
        Log::info(Auth::user());
        return response()->json([
            'user' => Auth::user(),
        ]);
    }
    public function register(Request $request)
    {
        try {
            $fields = $request->validate([
                'first_name' => 'required|string',
                'last_name' => 'required|string',
                'email' => 'required|email',
                'password' => 'required|string',
                'password_confirmation' => 'required|string',
                'phone' => 'required|string',
            ]);

            Log::info($fields);

            $user = User::create($fields);

            $token = $user->createToken($request->name);

            return response([
                'user' => $user,
                'token' => $token->plainTextToken,
            ], 201);
        } catch (\Exception $e) {
            Log::error('Error creating user: ' . $e->getMessage());

            return response([
                'error' => 'An error occurred while creating the user.',
            ], 500);
        }
    }

    public function login(Request $request)
    {
        $fields = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $fields['email'])->first();

        if (!$user || !Hash::check($fields['password'], $user->password)) {
            return response([
                'message' => 'Bad credentials',
            ], 401);
        } else {
            $token = $user->createToken('auth_token')->plainTextToken;

            return response([
                'user' => $user,
                'token' => $token, 
            ], 201);
        }
    }

    public function checkUsername(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $name = $request->input('name');
        $userExists = User::where('name', $name)->exists();

        return response()->json(['exists' => $userExists]);
    }

    public function logout(Request $request)
    {
        return 'logout';
    }
}
