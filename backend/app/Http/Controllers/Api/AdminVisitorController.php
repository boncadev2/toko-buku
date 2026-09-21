<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\Visitor;
use Carbon\Carbon;
use Illuminate\Http\Request;

class AdminVisitorController extends Controller
{
    public function index()
    {
        $today = Visitor::where('visited_date', Carbon::today())->count();
        $yesterday = Visitor::where('visited_date', Carbon::yesterday())->count();
        
        $thisMonth = Visitor::whereMonth('visited_date', Carbon::now()->month)
                            ->whereYear('visited_date', Carbon::now()->year)->count();
        $lastMonth = Visitor::whereMonth('visited_date', Carbon::now()->subMonth()->month)
                            ->whereYear('visited_date', Carbon::now()->subMonth()->year)->count();

        $chart = Visitor::selectRaw('visited_date as date, count(*) as total')
                        ->where('visited_date', '>=', Carbon::now()->subDays(29))
                        ->groupBy('visited_date')
                        ->orderBy('visited_date')
                        ->get();

        return response()->json([
            'data' => [
                'today' => $today,
                'yesterday' => $yesterday,
                'this_month' => $thisMonth,
                'last_month' => $lastMonth,
                'chart' => $chart
            ]
        ]);
    }
}
