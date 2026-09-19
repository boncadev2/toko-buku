<?php
$file = 'backend/app/Http/Controllers/Api/PublicCatalogController.php';
$content = file_get_contents($file);

$content = str_replace(
    "\$q=Book::where('is_active',true)->with('category');",
    "\$q=Book::where('is_active',true)->with('category')->withAvg(['reviews' => fn(\$q) => \$q->where('status', 'approved')], 'rating');",
    $content
);

$content = str_replace(
    "return new BookResource(\$book->load(['category','images']));",
    "\$book->loadAvg(['reviews' => fn(\$q) => \$q->where('status', 'approved')], 'rating');\n        return new BookResource(\$book->load(['category','images']));",
    $content
);

$content = str_replace(
    "return BookResource::collection(\$category->books()->where('is_active',true)->paginate(\$r->integer('per_page',12)));",
    "return BookResource::collection(\$category->books()->where('is_active',true)->withAvg(['reviews' => fn(\$q) => \$q->where('status', 'approved')], 'rating')->paginate(\$r->integer('per_page',12)));",
    $content
);

file_put_contents($file, $content);
