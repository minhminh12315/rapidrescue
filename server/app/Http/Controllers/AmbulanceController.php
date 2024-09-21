<?php

namespace App\Http\Controllers;

use App\Models\Ambulance;
use App\Http\Requests\StoreAmbulanceRequest;
use App\Http\Requests\UpdateAmbulanceRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;


class AmbulanceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $ambulances = Ambulance::all();

        return response()->json($ambulances, 200);
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
    public function store(StoreAmbulanceRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Ambulance $ambulance)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Ambulance $ambulance)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Ambulance $ambulance)
    {
        Log::info('Request data:', $request->all());

        $validated = $request->validate([
            'driver_id' => 'required|exists:ambulances,id',
            'location' => 'required|json',
        ]);

        // Giải mã vị trí
        $location = json_decode($validated['location'], true);

        // Cập nhật vị trí tài xế
        Ambulance::where('id', $validated['driver_id'])
            ->update([
                'latitude' => $location[1],
                'longitude' => $location[0],
                'updated_at' => now(),
            ]);

        return response()->json(['message' => 'Location updated successfully']);
    }


    public function getDriverLocation($driverId)
{
    $ambulance = Ambulance::where('driver_id', $driverId)->first(); // Sử dụng $driverId từ URL

    if ($ambulance) {
        return response()->json([
            'longitude' => $ambulance->longitude,
            'latitude' => $ambulance->latitude,
        ]);
    } else {
        return response()->json(['message' => 'Driver not found'], 404);
    }
}


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ambulance $ambulance)
    {
        //
    }

    public function deleteAmbulance($id)
    {
        try {
            $ambulance = Ambulance::find($id);
            $ambulance->delete();
            return response()->json(['message' => 'Text deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error deleting text'], 500);
        }
    }
}
