<?php

namespace Database\Seeders;

use App\Models\Address;
use App\Models\Book;
use App\Models\BookImage;
use App\Models\Category;
use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $roles = collect([
            ['name' => 'super-admin', 'display_name' => 'Super Admin'],
            ['name' => 'admin', 'display_name' => 'Admin'],
            ['name' => 'cashier', 'display_name' => 'Kasir'],
            ['name' => 'warehouse', 'display_name' => 'Warehouse'],
            ['name' => 'finance', 'display_name' => 'Finance'],
            ['name' => 'customer-service', 'display_name' => 'Customer Service'],
            ['name' => 'customer', 'display_name' => 'Customer'],
        ])->mapWithKeys(fn (array $role) => [
            $role['name'] => Role::query()->firstOrCreate(['name' => $role['name']], $role),
        ]);

        $permissions = collect([
            ['name' => 'catalog.view', 'display_name' => 'Lihat katalog', 'group' => 'catalog'],
            ['name' => 'catalog.create', 'display_name' => 'Buat buku', 'group' => 'catalog'],
            ['name' => 'catalog.update', 'display_name' => 'Ubah buku', 'group' => 'catalog'],
            ['name' => 'catalog.delete', 'display_name' => 'Hapus buku', 'group' => 'catalog'],
            ['name' => 'catalog.restore', 'display_name' => 'Pulihkan buku', 'group' => 'catalog'],
            ['name' => 'order.view', 'display_name' => 'Lihat pesanan', 'group' => 'order'],
            ['name' => 'order.update', 'display_name' => 'Ubah pesanan', 'group' => 'order'],
            ['name' => 'customer.view', 'display_name' => 'Lihat pelanggan', 'group' => 'customer'],
            ['name' => 'customer.update', 'display_name' => 'Ubah pelanggan', 'group' => 'customer'],
            ['name' => 'finance.view', 'display_name' => 'Lihat keuangan', 'group' => 'finance'],
            ['name' => 'settings.view', 'display_name' => 'Lihat pengaturan', 'group' => 'settings'],
            ['name' => 'settings.update', 'display_name' => 'Ubah pengaturan', 'group' => 'settings'],
        ])->mapWithKeys(fn (array $permission) => [
            $permission['name'] => Permission::query()->firstOrCreate(['name' => $permission['name']], $permission),
        ]);

        $assignments = [
            'super-admin' => $permissions->keys()->all(),
            'admin' => ['catalog.view', 'catalog.create', 'catalog.update', 'catalog.delete', 'catalog.restore', 'order.view', 'order.update', 'customer.view', 'customer.update', 'settings.view', 'settings.update'],
            'cashier' => ['order.view', 'order.update', 'customer.view'],
            'warehouse' => ['catalog.view', 'catalog.update', 'order.view'],
            'finance' => ['order.view', 'finance.view'],
            'customer-service' => ['order.view', 'order.update', 'customer.view', 'customer.update'],
            'customer' => [],
        ];

        foreach ($assignments as $roleName => $permissionNames) {
            $roles[$roleName]->permissions()->sync(
                $permissions->only($permissionNames)->pluck('id')->all()
            );
        }

        $customer = User::query()->firstOrCreate(
            ['email' => 'pelanggan@example.test'],
            [
                'name' => 'Pelanggan Demo',
                'phone' => '081234567890',
                'password' => Hash::make('password'),
            ]
        );

        $customer->roles()->syncWithoutDetaching([$roles['customer']->id]);

        $admin = User::query()->firstOrCreate(['email' => 'admin@example.test'], ['name' => 'Admin Demo', 'phone' => '081234567899', 'password' => Hash::make('password')]);
        $admin->roles()->syncWithoutDetaching([$roles['admin']->id]);
        Address::query()->firstOrCreate(
            ['user_id' => $customer->id, 'is_default' => true],
            [
                'label' => 'Rumah',
                'recipient_name' => $customer->name,
                'phone' => $customer->phone,
                'address_line_1' => 'Alamat demo',
                'city' => 'Jakarta',
                'province' => 'DKI Jakarta',
                'postal_code' => '10110',
            ]
        );

        $filsafat = Category::query()->firstOrCreate(
            ['slug' => 'filsafat'],
            ['name' => 'Filsafat', 'description' => 'Buku pemikiran dan filsafat.', 'is_active' => true]
        );

        $book = Book::query()->updateOrCreate(
            ['sku' => 'BK-NIETZSCHE-001'],
            [
                'category_id' => $filsafat->id,
                'slug' => 'demikianlah-sabda-zarathustra',
                'title' => 'Demikianlah Sabda Zarathustra',
                'author' => 'Friedrich Wilhelm Nietzsche',
                'publisher' => 'basabasi',
                'publication_year' => 2026,
                'pages' => 206,
                'short_description' => 'Karya filsafat Friedrich Wilhelm Nietzsche.',
                'cost_price' => 50000,
                'price' => 75000,
                'weight' => 300,
                'stock' => 20,
                'minimum_stock' => 3,
                'is_featured' => true,
                'is_active' => true,
            ]
        );

        BookImage::query()->firstOrCreate(
            ['book_id' => $book->id, 'sort_order' => 0],
            ['image_path' => 'books/demo-nietzsche-cover.jpg', 'alt_text' => $book->title]
        );

        $catalogCategories = collect([
            'fiksi-sastra' => 'Fiksi & Sastra',
            'pengembangan-diri' => 'Pengembangan Diri',
            'bisnis-finansial' => 'Bisnis & Finansial',
            'sains-sejarah' => 'Sains & Sejarah',
            'anak-remaja' => 'Anak & Remaja',
        ])->mapWithKeys(fn (string $name, string $slug) => [$slug => Category::query()->firstOrCreate(['slug' => $slug], ['name' => $name, 'is_active' => true])]);

        $demoBooks = [
            ['laut-bercerita', 'Laut Bercerita', 'Leila S. Chudori', 'fiksi-sastra', 115000, 24],
            ['bumi-manusia', 'Bumi Manusia', 'Pramoedya A. Toer', 'fiksi-sastra', 95000, 18],
            ['atomic-habits', 'Atomic Habits', 'James Clear', 'pengembangan-diri', 108000, 30],
            ['filosofi-teras', 'Filosofi Teras', 'Henry Manampiring', 'pengembangan-diri', 98000, 22],
            ['sapiens', 'Sapiens', 'Yuval Noah Harari', 'sains-sejarah', 145000, 15],
            ['the-midnight-library', 'The Midnight Library', 'Matt Haig', 'fiksi-sastra', 91000, 19],
            ['rich-dad-poor-dad', 'Rich Dad Poor Dad', 'Robert T. Kiyosaki', 'bisnis-finansial', 112000, 17],
            ['kosakata-anak-hebat', 'Kosakata Anak Hebat', 'Fran Bromage', 'anak-remaja', 87000, 25],
        ];
        foreach ($demoBooks as [$slug, $title, $author, $categorySlug, $price, $stock]) {
            Book::query()->updateOrCreate(['sku' => 'BK-DEMO-'.strtoupper(str_replace('-', '-', $slug))], [
                'category_id' => $catalogCategories[$categorySlug]->id, 'slug' => $slug, 'title' => $title,
                'author' => $author, 'publisher' => 'Bukupagi Demo', 'publication_year' => 2024,
                'pages' => 200, 'short_description' => "Edisi demo {$title} untuk pengujian katalog.",
                'cost_price' => $price * 0.6, 'price' => $price, 'weight' => 350,
                'stock' => $stock, 'minimum_stock' => 3, 'is_featured' => true, 'is_active' => true,
            ]);
        }
    }
}
