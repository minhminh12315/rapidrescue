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
                'user_id' => '', // neu co dang nhap thi lay user_id
                'hospital_id' => 'required', // id benh vien
                'phone' => 'required', // so dien thoai
                'type' => 'required', // 1: urgent, 2: non-gent
                'ambulance_id' => 'required',   // id xe cua benh vien
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
