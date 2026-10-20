<?php
\App\Models\Book::where('slug', 'cantik-itu-luka')->update(['price' => 110000, 'discount_type' => 'percentage', 'discount_value' => 29]);
\App\Models\Book::where('slug', 'bumi-manusia')->update(['price' => 95000, 'discount_type' => 'percentage', 'discount_value' => 24]);
\App\Models\Book::where('slug', 'the-midnight-library')->update(['price' => 130000, 'discount_type' => 'percentage', 'discount_value' => 30]);
\App\Models\Book::where('slug', 'sebuah-seni-untuk-bersikap-bodo-amat')->update(['price' => 120000, 'discount_type' => 'percentage', 'discount_value' => 29]);
