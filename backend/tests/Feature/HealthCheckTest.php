<?php

namespace Tests\Feature;

use Tests\TestCase;

class HealthCheckTest extends TestCase
{
    public function test_health_endpoint_returns_service_status(): void
    {
        $this->getJson('/api/health')
            ->assertOk()
            ->assertExactJson([
                'data' => [
                    'service' => config('app.name'),
                    'status' => 'ok',
                    'version' => '1.0.0',
                ],
            ]);
    }
}
