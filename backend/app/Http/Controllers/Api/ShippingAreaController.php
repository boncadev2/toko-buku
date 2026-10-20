<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\Shipping\BiteshipShippingProvider;
use Illuminate\Http\Request;

class ShippingAreaController extends Controller
{
    public function __invoke(Request $request, BiteshipShippingProvider $biteship)
    {
        $data = $request->validate([
            'query' => ['required', 'string', 'min:2', 'max:120'],
        ]);

        return response()->json(['data' => $biteship->searchAreas($data['query'])]);
    }
}
