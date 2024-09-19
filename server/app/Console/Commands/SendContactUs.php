<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;
use App\Models\Contact;
use App\Mail\ContactFormMail;

class SendContactUs extends Command
{
    protected $signature = 'contact:send';
    protected $description = 'Send contact emails';

    public function __construct()
    {
        parent::__construct(); // Không nhận tham số
    }

    public function handle()
    {
        // Lấy một lô phản hồi chưa gửi (giới hạn 100)
        $contacts = Contact::where('status', 'wait')->take(1)->get(); // Lọc theo trạng thái 'Wait'
        $ContactCount = $contacts->count();
        $this->info("Total pending contacts in this batch: $ContactCount");

        if ($ContactCount === 0) {
            $this->info('No pending contacts to send.');
        }

        foreach ($contacts as $contact) {
            try {
                // Gửi email
                Mail::to($contact->email)->send(new ContactFormMail($contact->name));

                // Cập nhật trạng thái phản hồi thành 'Done' sau khi gửi thành công
                $contact->status = 'done';
                $contact->save(); // Lưu thay đổi vào cơ sở dữ liệu

                $this->info("Contact sent and status updated for: {$contact->email}");
            } catch (\Exception $e) {
                $this->error("Failed to send contact to: {$contact->email}. Error: " . $e->getMessage());
                // Có thể chọn đánh dấu phản hồi này là lỗi hoặc ghi log lỗi để xử lý sau
            }
        }

        $this->info('Batch of pending contacts has been processed.');
    }
}
