<?php
$file = 'backend/app/Models/Book.php';
$content = file_get_contents($file);

$reviewsRelation = "
    public function reviews(): HasMany
    {
        return \$this->hasMany(Review::class);
    }
";

$content = str_replace(
    "public function stockMovements(): HasMany",
    $reviewsRelation . "\n    public function stockMovements(): HasMany",
    $content
);

file_put_contents($file, $content);
