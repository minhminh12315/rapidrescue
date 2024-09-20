<?php

namespace App\Http\Controllers;

use App\Models\Ambulance;
use App\Http\Requests\StoreAmbulanceRequest;
use App\Http\Requests\UpdateAmbulanceRequest;

class AmbulanceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $ambulances = Ambulance::all();

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
    public function update(UpdateAmbulanceRequest $request, Ambulance $ambulance)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ambulance $ambulance)
    {
        //
    }
}
