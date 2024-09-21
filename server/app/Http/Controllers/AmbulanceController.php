<?php

namespace App\Http\Controllers;

use App\Models\Ambulance;
use App\Http\Requests\StoreAmbulanceRequest;
use App\Http\Requests\UpdateAmbulanceRequest;
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
    public function update(UpdateAmbulanceRequest $request, Ambulance $ambulance)
    {
        try {
            $ambulance->update($request->validated());
            return response()->json(['message' => 'Ambulance updated successfully', 'data' => $ambulance], 200);
        } catch (\Exception $e) {
            Log::error('Error updating ambulance: ' . $e->getMessage());
            return response()->json(['message' => 'Error updating ambulance'], 500);
        }
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
