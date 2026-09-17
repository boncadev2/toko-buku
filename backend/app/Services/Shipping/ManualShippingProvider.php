<?php

namespace App\Services\Shipping;

class ManualShippingProvider implements ShippingProviderInterface
{
    public function quote(array $destination, int $weight): array
    {
        $province = strtolower((string) ($destination['province'] ?? ''));
        $kilograms = max(1, (int) ceil($weight / 1000));

        $baseRate = match (true) {
            str_contains($province, 'jakarta') => 10_000,
            str_contains($province, 'banten'), str_contains($province, 'jawa barat') => 14_000,
            str_contains($province, 'jawa') => 18_000,
            str_contains($province, 'sumatera') => 25_000,
            default => 32_000,
        };

        return [
            [
                'courier' => 'REGULER',
                'service' => 'Pengiriman reguler',
                'cost' => $baseRate + (($kilograms - 1) * 5_000),
                'eta' => '2–5 hari',
            ],
            [
                'courier' => 'EXPRESS',
                'service' => 'Pengiriman cepat',
                'cost' => (int) round(($baseRate + (($kilograms - 1) * 7_000)) * 1.75),
                'eta' => '1–2 hari',
            ],
            [
                'courier' => 'PICKUP',
                'service' => 'Ambil di toko',
                'cost' => 0,
                'eta' => 'Siap diambil',
            ],
        ];
    }

    public function track(string $trackingNumber): array
    {
        return ['tracking_number' => $trackingNumber, 'status' => 'pending', 'events' => []];
    }
}
