<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Address;
use App\Services\Shipping\BiteshipShippingProvider;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class AccountAddressController extends Controller
{
    public function store(Request $request, BiteshipShippingProvider $biteship)
    {
        $data = $this->validated($request, $biteship);
        $user = $request->user();
        if ($data['is_default'] || !$user->addresses()->exists()) {
            $user->addresses()->update(['is_default' => false]);
            $data['is_default'] = true;
        }
        return response()->json(['data' => $user->addresses()->create($data)], 201);
    }

    public function update(Request $request, Address $address, BiteshipShippingProvider $biteship)
    {
        abort_unless($address->user_id === $request->user()->id, 403);
        $data = $this->validated($request, $biteship);
        if ($data['is_default']) {
            $request->user()->addresses()->whereKeyNot($address->id)->update(['is_default' => false]);
        }
        $address->update($data);
        return response()->json(['data' => $address->fresh()]);
    }

    public function destroy(Request $request, Address $address)
    {
        abort_unless($address->user_id === $request->user()->id, 403);
        $wasDefault = $address->is_default;
        $address->delete();
        if ($wasDefault) $request->user()->addresses()->first()?->update(['is_default' => true]);
        return response()->noContent();
    }

    private function validated(Request $request, BiteshipShippingProvider $biteship): array
    {
        $data = $request->validate([
            'label' => ['nullable', 'string', 'max:50'], 'recipient_name' => ['required', 'string', 'max:100'],
            'phone' => ['required', 'string', 'max:30'], 'address_line_1' => ['required', 'string', 'max:255'],
            'subdistrict' => ['required', 'string', 'max:100'], 'district' => ['required', 'string', 'max:100'],
            'city' => ['required', 'string', 'max:100'], 'province' => ['required', 'string', 'max:100'],
            'postal_code' => ['required', 'digits:5'], 'biteship_area_id' => ['required', 'string', 'max:100'],
            'is_default' => ['sometimes', 'boolean'],
        ]);
        $areas = $biteship->searchAreas($data['district'].', '.$data['city'].', '.$data['province'].', '.$data['postal_code']);
        $valid = collect($areas)->contains(fn ($area) => ($area['id'] ?? null) === $data['biteship_area_id']
            && (string) ($area['postal_code'] ?? '') === $data['postal_code']
            && ($area['administrative_division_level_3_name'] ?? null) === $data['district']
            && ($area['administrative_division_level_2_name'] ?? null) === $data['city']);
        if (!$valid) throw ValidationException::withMessages(['address' => ['Wilayah dan kode pos tidak cocok dengan data Biteship.']]);
        $data['is_default'] = (bool) ($data['is_default'] ?? false);
        return $data;
    }
}
