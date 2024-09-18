<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use App\Http\Requests\UpdateContactRequest;
use Illuminate\Support\Facades\Log;
use GuzzleHttp\Client;



class ContactController extends Controller
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
            'captchaToken' => 'required|string',
        ]);

        // Xác thực reCAPTCHA
        $captchaResponse = $request->input('captchaToken');

        $client = new Client();
        $response = $client->post('https://www.google.com/recaptcha/api/siteverify', [
            'form_params' => [
                'secret' => env('RECAPTCHA_SECRET'),
                'response' => $captchaResponse,
            ]
        ]);

        $body = json_decode((string) $response->getBody(), true);

        if (!$body['success']) {
            // Nếu reCAPTCHA không hợp lệ, trả về lỗi
            return response()->json(['message' => 'Captcha validation failed'], 422);
        }

        // Lưu thông tin liên hệ vào cơ sở dữ liệu nếu captcha hợp lệ
        Contact::create($validatedData);

        // Trả về phản hồi thành công
        return response()->json(['message' => 'Contact message sent successfully!'], 201);
    }
    /**
     * Display the specified resource.
     */
    public function show(Contact $contact)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Contact $contact)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateContactRequest $request, Contact $contact)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Contact $contact)
    {
        //
    }
}
