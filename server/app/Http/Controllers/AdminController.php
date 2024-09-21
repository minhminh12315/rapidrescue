<?php

namespace App\Http\Controllers;

use App\Models\Ambulance;
use App\Models\EmergencyRequest;
use App\Models\Hospital;
use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function dashboardStats()
    {
        $totalAmbulanceCars = Ambulance::count();
        $totalHospitals = Hospital::count();
        $totalUsers = User::count();
        // Giả sử bạn có một model cho booking
        $totalBookings = EmergencyRequest::count(); // Cần phải tạo model và bảng booking

        return response()->json([
            'totalAmbulanceCars' => $totalAmbulanceCars,
            'totalHospitals' => $totalHospitals,
            'totalUsers' => $totalUsers,
            'totalBookings' => $totalBookings,
        ]);
    }
}
