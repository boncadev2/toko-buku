<?php

namespace App\Services\Shipping;

use Illuminate\Support\Facades\Http;
use Illuminate\Validation\ValidationException;

class BiteshipShippingProvider implements ShippingProviderInterface
{
    private function client()
    {
        $key = config('services.biteship.api_key');
        if (!$key) {
            throw ValidationException::withMessages(['shipping' => ['Biteship API key belum dikonfigurasi.']]);
        }

        return Http::baseUrl(config('services.biteship.base_url'))
            ->withHeaders(['Authorization' => $key])
            ->acceptJson();
    }

    public function searchAreas(string $query): array
    {
        $response = $this->client()->get('/maps/areas', [
            'countries' => 'ID',
            'input' => $query,
            'type' => 'single',
        ]);
        $response->throw();

        return $response->json('areas') ?? [];
    }

    public function quote(array $destination, int $weight): array
    {
        $payload = [
            'origin_postal_code' => (int) config('services.biteship.origin_postal_code'),
            'destination_postal_code' => (int) $destination['postal_code'],
            'couriers' => config('services.biteship.couriers'),
            'items' => [[
                'name' => 'Pesanan Bukupagi',
                'quantity' => 1,
                'weight' => $weight,
                'value' => 1,
            ]],
        ];

        if (!empty($destination['area_id'])) {
            $payload['destination_area_id'] = $destination['area_id'];
        }

        $response = $this->client()->post('/rates/couriers', $payload);
        $response->throw();

        return $response->json('pricing') ?? $response->json('data') ?? [];
    }

    public function track(string $trackingNumber): array
    {
        $response = $this->client()->get('/trackings/'.$trackingNumber);
        $response->throw();

        return $response->json();
    }
}
