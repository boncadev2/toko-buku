<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\Visitor;

class TrackVisitor
{
    public function handle(Request $request, Closure $next)
    {
        try {
            Visitor::firstOrCreate([
                'ip_address' => $request->ip(),
                'visited_date' => now()->toDateString(),
            ]);
        } catch (\Throwable $e) {
            // Ignore unique constraint violations or DB errors to not break API
        }

        return $next($request);
    }
}
