<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Station;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class StationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        return response()->json([
            'stations' => Station::latest()->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'station_name' => [
                'required',
                'string',
                'max:255',
                'unique:stations,station_name',
            ],

            'tier_category' => [
                'required',
                'in:Regular,VIP,Streaming Room',
            ],

            'hourly_rate' => [
                'required',
                'numeric',
                'min:0',
            ],
        ]);

        $station = Station::create($validated);

        return response()->json([
            'message' => 'Station added successfully.',
            'station' => $station,
        ], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function show(Station $station): JsonResponse
    {
        return response()->json([
            'station' => $station,
        ]);
    }
}