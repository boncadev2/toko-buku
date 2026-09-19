<?php
$file = 'backend/app/Http/Controllers/Api/PublicCatalogController.php';
$content = file_get_contents($file);
$content = str_replace(
  "public function show(Book \$book) { abort_unless(\$book->is_active,404); return new BookResource(\$book->load(['category','images'])); }",
  "public function show(Book \$book) { abort_unless(\$book->is_active,404); \$book->increment('views_count'); return new BookResource(\$book->load(['category','images'])); }",
  $content
);
file_put_contents($file, $content);
