<?php

namespace App\Http\Controllers;

use App\Models\Image;
use App\Http\Requests\StoreImageRequest;
use App\Http\Requests\UpdateImageRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ImageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $images = Image::all();
        Log::info($images);
        return response()->json($images);
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
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'type' => 'required|string|max:50',
            'path' => 'required|file|mimes:jpg,jpeg,png,gif|max:2048', // Kích thước tối đa 2MB
        ]);
    
        // Lưu file
        $path = $request->file('path')->store('images', 'public');
    
        // Tạo bản ghi mới trong cơ sở dữ liệu
        $image = new Image();
        $image->title = $request->input('title');
        $image->description = $request->input('description');
        $image->type = $request->input('type');
        $image->path = $path; // Lưu đường dẫn file
        $image->save();
    
        return response()->json([
            'message' => 'Image created successfully.',
            'data' => $image,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Image $image)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Image $image)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateImageRequest $request, Image $image)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Image $image)
    {
        //
    }
}
