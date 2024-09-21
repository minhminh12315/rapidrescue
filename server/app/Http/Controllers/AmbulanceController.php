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
        Log::info($ambulances);
        return response() -> json($ambulances, 200);
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
        try {
            $ambulance = Ambulance::create($request->validated());
            return response()->json(['message' => 'Ambulance created successfully', 'data' => $ambulance], 201);
        } catch (\Exception $e) {
            Log::error('Error creating ambulance: ' . $e->getMessage());
            return response()->json(['message' => 'Error creating ambulance'], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Ambulance $ambulance)
    {
        return response()->json($ambulance, 200);
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
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ambulance $ambulance)
    {
        try {
            $ambulance->delete();
            return response()->json(['message' => 'Ambulance deleted successfully'], 200);
        } catch (\Exception $e) {
            Log::error('Error deleting ambulance: ' . $e->getMessage());
            return response()->json(['message' => 'Error deleting ambulance'], 500);
        }
    }
    
    public function deleteAmbulance($id){
        try {
            $ambulance = Ambulance::find($id);
            $ambulance->delete();
            return response()->json(['message' => 'Text deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error deleting text'], 500);
        }
    }
}
