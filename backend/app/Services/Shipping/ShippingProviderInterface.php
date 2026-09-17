<?php
namespace App\Services\Shipping;
interface ShippingProviderInterface { public function quote(array $destination, int $weight): array; public function track(string $trackingNumber): array; }
