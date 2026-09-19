<?php
$file = 'backend/app/Http/Resources/BookResource.php';
$content = file_get_contents($file);

$content = str_replace(
    "'sold_count' => \$this->sold_count,",
    "'sold_count' => \$this->sold_count, 'rating' => \$this->reviews_avg_rating ? round(\$this->reviews_avg_rating, 1) : 0,",
    $content
);

file_put_contents($file, $content);
