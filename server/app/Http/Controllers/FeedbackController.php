<?php

namespace App\Http\Controllers;

use App\Models\Feedback;
use App\Http\Requests\StoreFeedbackRequest;
use App\Http\Requests\UpdateFeedbackRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class FeedbackController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
         // Ghi log để kiểm tra dữ liệu gửi từ React
         Log::info($request->all());

         // Validate dữ liệu đầu vào
         $validatedData = $request->validate([
             'name' => 'required|string|max:255',
             'email' => 'required|email|max:255',
             'phone' => 'nullable|string|max:20',
             'message' => 'required|string',
         ]);

         // Lưu vào cơ sở dữ liệu
         $feedback = Feedback::create($validatedData);

         // Trả về phản hồi sau khi lưu thành công
         return response()->json(['message' => 'Feedback saved successfully!', 'data' => $feedback], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Feedback $feedback)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Feedback $feedback)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFeedbackRequest $request, Feedback $feedback)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Feedback $feedback)
    {
        //
    }
}
