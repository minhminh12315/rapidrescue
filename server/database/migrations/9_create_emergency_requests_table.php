<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('emergency_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('hospital_id')->nullable()->constrained('hospitals')->nullOnDelete();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('phone');
            $table->string('type');
            $table->string('status')->default('pending');
            $table->foreignId('ambulance_id')->nullable()->constrained('ambulances')->nullOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('emergency_requests');
    }
};
