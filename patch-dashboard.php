<?php
$f = 'backend/app/Http/Controllers/Api/AdminDashboardController.php';
$c = file_get_contents($f);

// Add Visitor to imports if not there
if (!str_contains($c, 'use App\Models\Visitor;')) {
    $c = str_replace('use App\Models\User;', "use App\Models\User; use App\Models\Visitor;", $c);
}

// Add visitor stats to kpi
$oldKpi = "'pending_payment'=>(clone \$q)->where('status','pending_payment')->count()";
$newKpi = $oldKpi . ",'visitors'=>\App\Models\Visitor::when(\$d['from']??null, fn(\$q,\$v)=>\$q->where('visited_date','>=',\$v))->when(\$d['to']??null, fn(\$q,\$v)=>\$q->where('visited_date','<=',\$v))->count(),'visitors_today'=>\App\Models\Visitor::where('visited_date', now()->toDateString())->count()";

$c = str_replace($oldKpi, $newKpi, $c);
file_put_contents($f, $c);
