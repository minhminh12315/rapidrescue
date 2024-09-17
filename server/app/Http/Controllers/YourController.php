<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class YourController extends Controller
{
    public function example()
    {
        $data = [
            'message' => 'Hello from YourController!',
            'status' => 'success',
        ];

        return response()->json($data);
    }
}
