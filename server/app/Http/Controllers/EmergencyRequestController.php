<?php

namespace App\Http\Controllers;

use App\Models\EmergencyRequest;
use App\Http\Requests\StoreEmergencyRequestRequest;
use App\Http\Requests\UpdateEmergencyRequestRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;


class EmergencyRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            // Lấy tất cả các yêu cầu khẩn cấp từ cơ sở dữ liệu
            $emergencyRequests = EmergencyRequest::all();

            return response()->json($emergencyRequests, 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching emergency requests',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Log::info($request->all());
        try {
            $fields = $request->validate([
                'user_id' => '', // nếu có đăng nhập thì lấy user_id
                'hospital_id' => 'required', // ID bệnh viện
                'phone' => 'required', // Số điện thoại
                'type' => 'required', // 1: urgent, 2: non-urgent
                'ambulance_id' => 'required', // ID xe của bệnh viện
                'textarea_value' => 'nullable|string',
                'start_location' => 'nullable', // Không bắt buộc, vị trí người dùng
                'destination' => 'nullable', // Không bắt buộc, tọa độ bệnh viện
            ]);

            $emt_id = User::where([
                ['role', '=', 'emt'],
                ['status', '=', 'free']
            ])->first()->id;

            $fields['emt_id'] = $emt_id;

            User::where('id', $emt_id)->update(['status' => 'busy']);

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

    public function getDriverRequests($driverId)
    {
        // Truy vấn yêu cầu khẩn cấp cho driver_id cụ thể
        $requests = EmergencyRequest::where('ambulance_id', $driverId)->get();

        return response()->json($requests);
    }
    


    /**
     * Display the specified resource.
     */
    public function show(Request $emergencyRequest)
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
