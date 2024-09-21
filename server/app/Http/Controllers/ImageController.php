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
    public function edit($id)
    {
        try {
            $image = Image::findOrFail($id);

            return response()->json([
                'message' => 'Image data retrieved successfully.',
                'data' => $image,
            ], 200);

        } catch (\Exception $e) {
            Log::error('Error retrieving image with ID: ' . $id . '. Error: ' . $e->getMessage());
            return response()->json(['message' => 'Error retrieving image data.'], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        Log::info($request->all());
        try {
            $image = Image::findOrFail($id);

            $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'nullable|string',
                'type' => 'required|string|max:50',
                'path' => 'nullable|file|mimes:jpg,jpeg,png,gif|max:2048',
            ]);

            if ($request->hasFile('path')) {
                $oldImagePath = public_path('storage/' . $image->path);
                if (file_exists($oldImagePath)) {
                    unlink($oldImagePath);
                }

                $path = $request->file('path')->store('images', 'public');
                $image->path = $path; 
            }

            $image->title = $request->input('title');
            $image->description = $request->input('description');
            $image->type = $request->input('type');

            $image->save();

            return response()->json([
                'message' => 'Image updated successfully.',
                'data' => $image,
            ], 200);

        } catch (\Exception $e) {
            Log::error('Error updating image with ID: ' . $id . '. Error: ' . $e->getMessage());
            return response()->json(['message' => 'Error updating image.'], 500);
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        Log::info("Attempting to delete image with ID: " . $id);

        try {
            // Tìm ảnh theo ID
            $image = Image::findOrFail($id);

            // Log thông tin ảnh
            Log::info('Image found: ' . $image->path);

            // Xóa ảnh khỏi thư mục lưu trữ nếu ảnh tồn tại
            $imagePath = public_path('storage/' . $image->path);
            if (file_exists($imagePath)) {
                Log::info('Deleting file: ' . $imagePath);
                unlink($imagePath);
            } else {
                Log::warning('File not found: ' . $imagePath);
            }

            // Xóa dữ liệu hình ảnh khỏi cơ sở dữ liệu
            $image->delete();

            Log::info('Image deleted successfully with ID: ' . $id);
            return response()->json(['message' => 'Image deleted successfully.'], 200);

        } catch (\Exception $e) {
            // Log thông tin lỗi
            Log::error('Error deleting image with ID: ' . $id . '. Error: ' . $e->getMessage());
            return response()->json(['message' => 'Error deleting image.'], 500);
        }
    }

    public function deleteImage($id)
    {
        try {
            $image = Image::find($id);
            $image->delete();
            return response(['message' => 'Hospital deleted successfully.'], 200);
        } catch (\Exception $e) {
            return response([
                'error' => 'There was an error deleting the hospital.',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
