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
            return response($hospitals, 200);
        } catch (\Exception $e) {
            return response([
                'error' => 'There was an error fetching the hospitals.',
                'message' => $e->getMessage()
            ], 500);
        }
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
        Log::info($request->all());

        try {
            $fields = $request->validate([
                'name' => 'required|string',
                'address' => 'required|string',
                'phone' => 'required|string',
            ]);

            $hospital = Hospital::create([
                'name' => $fields['name'],
                'address' => $fields['address'],
                'phone' => $fields['phone'],
            ]);

            return response($hospital, 201);
        } catch (\Exception $e) {
            return response([
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
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Hospital $hospital)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateHospitalRequest $request, Hospital $hospital)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Hospital $hospital)
    {
        
    }
    public function deleteHospital($id)
    {
        try {
            $hospital = Hospital::find($id);
            $hospital->delete();
            return response(['message' => 'Hospital deleted successfully.'], 200);
        } catch (\Exception $e) {
            return response([
                'error' => 'There was an error deleting the hospital.',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
