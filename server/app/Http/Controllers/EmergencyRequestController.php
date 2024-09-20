<?php

namespace App\Http\Controllers;

use App\Models\EmergencyRequest;
use App\Http\Requests\StoreEmergencyRequestRequest;
use App\Http\Requests\UpdateEmergencyRequestRequest;
use Illuminate\Http\Request;

class EmergencyRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $fields = $request->validate([
                'user_id' => '', // nếu có đăng nhập thì lấy user_id
                'hospital_id' => 'required', // ID bệnh viện
                'phone' => 'required', // Số điện thoại
                'type' => 'required', // 1: urgent, 2: non-urgent
                'ambulance_id' => 'required', // ID xe của bệnh viện
            ]);
    
            $emergencyRequest = EmergencyRequest::create($fields);
    
            return response($emergencyRequest, 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error creating emergency request',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    

    /**
     * Display the specified resource.
     */
    public function show(EmergencyRequest $emergencyRequest)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(EmergencyRequest $emergencyRequest)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEmergencyRequestRequest $request, EmergencyRequest $emergencyRequest)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(EmergencyRequest $emergencyRequest)
    {
        //
    }
}
