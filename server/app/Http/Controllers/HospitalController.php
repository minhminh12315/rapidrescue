<?php

namespace App\Http\Controllers;

use App\Models\Hospital;
use App\Http\Requests\StoreHospitalRequest;
use App\Http\Requests\UpdateHospitalRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class HospitalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $hospitals = Hospital::all();
            Log::info($hospitals);
            return response()->json($hospitals, 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'There was an error fetching the hospitals.',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreHospitalRequest $request)
    {
        Log::info($request->all());

        try {
            $fields = $request->validated();

            $hospital = Hospital::create($fields);

            return response()->json($hospital, 201);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'There was an error creating the hospital.',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Hospital $hospital)
    {
        return response()->json($hospital, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateHospitalRequest $request, Hospital $hospital)
    {
        try {
            $fields = $request->validated();
            $hospital->update($fields);

            return response()->json($hospital, 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'There was an error updating the hospital.',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $hospital = Hospital::findOrFail($id);
            $hospital->delete();
            return response()->json(['message' => 'Hospital deleted successfully.'], 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'There was an error deleting the hospital.',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Delete hospital by ID.
     */
    public function deleteHospital($id)
    {
        try {
            $hospital = Hospital::findOrFail($id);
            $hospital->delete();
            return response()->json(['message' => 'Hospital deleted successfully.'], 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'There was an error deleting the hospital.',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
