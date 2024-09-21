<?php

namespace App\Http\Controllers;

use App\Models\Text;
use App\Http\Requests\StoreTextRequest;
use App\Http\Requests\UpdateTextRequest;
use Illuminate\Support\Facades\Log;

class TextController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $texts = Text::all();
        return response()->json($texts, 200);

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
    public function store(StoreTextRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Text $text)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Text $text)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTextRequest $request, Text $text)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Text $text)
    {
        //
    }

    public function deleteText($id){
        try {
            $text = Text::find($id);
            $text->delete();
            return response(['message' => 'Hospital deleted successfully.'], 200);
        } catch (\Exception $e) {
            return response([
                'error' => 'There was an error deleting the hospital.',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
