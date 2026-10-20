<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SettingController extends Controller
{
    private function formatSettings($settings): array
    {
        $data = is_array($settings) ? $settings : $settings->toArray();

        $logoPath = $data['app_logo_path'] ?? null;
        $appLogo = $data['app_logo'] ?? null;

        if ($logoPath) {
            $data['app_logo'] = rtrim(config('app.url'), '/') . '/media/' . ltrim($logoPath, '/');
        } elseif ($appLogo) {
            if (str_contains($appLogo, '/storage/')) {
                $path = substr($appLogo, strpos($appLogo, '/storage/') + strlen('/storage/'));
                $data['app_logo'] = rtrim(config('app.url'), '/') . '/media/' . ltrim($path, '/');
            } elseif (!str_starts_with($appLogo, 'http://') && !str_starts_with($appLogo, 'https://')) {
                $data['app_logo'] = rtrim(config('app.url'), '/') . '/media/' . ltrim($appLogo, '/');
            }
        }

        $heroPath = $data['hero_image_path'] ?? null;
        $heroImage = $data['hero_image'] ?? null;

        if ($heroPath) {
            $data['hero_image'] = rtrim(config('app.url'), '/') . '/media/' . ltrim($heroPath, '/');
        } elseif ($heroImage) {
            if (str_contains($heroImage, '/storage/')) {
                $path = substr($heroImage, strpos($heroImage, '/storage/') + strlen('/storage/'));
                $data['hero_image'] = rtrim(config('app.url'), '/') . '/media/' . ltrim($path, '/');
            } elseif (!str_starts_with($heroImage, 'http://') && !str_starts_with($heroImage, 'https://')) {
                $data['hero_image'] = rtrim(config('app.url'), '/') . '/media/' . ltrim($heroImage, '/');
            }
        } elseif (file_exists(storage_path('app/public/hero/default-hero.jpg'))) {
            $data['hero_image'] = rtrim(config('app.url'), '/') . '/media/hero/default-hero.jpg';
        }

        return $data;
    }

    public function public()
    {
        $settings = Setting::where('is_secret', false)->pluck('value', 'key');

        return response()->json(['data' => $this->formatSettings($settings)]);
    }

    public function update(Request $request)
    {
        $data = $request->validate([
            'settings' => ['required', 'array'],
            'settings.*.key' => ['required', 'string', 'max:100'],
            'settings.*.value' => ['nullable', 'string'],
            'settings.*.is_secret' => ['nullable', 'boolean'],
            'logo' => ['nullable', 'file', 'image', 'mimes:jpg,jpeg,png,webp,svg', 'max:5120'],
            'hero_image' => ['nullable', 'file', 'image', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
        ]);

        foreach ($data['settings'] as $setting) {
            Setting::updateOrCreate(
                ['key' => $setting['key']],
                ['value' => $setting['value'] ?? null, 'is_secret' => $setting['is_secret'] ?? false]
            );
        }

        if ($request->hasFile('logo')) {
            $oldPath = Setting::where('key', 'app_logo_path')->value('value');
            $path = $request->file('logo')->store('settings', 'public');
            $logoUrl = rtrim(config('app.url'), '/') . '/media/' . ltrim($path, '/');

            Setting::updateOrCreate(['key' => 'app_logo_path'], ['value' => $path, 'is_secret' => false]);
            Setting::updateOrCreate(['key' => 'app_logo'], ['value' => $logoUrl, 'is_secret' => false]);

            if ($oldPath && $oldPath !== $path) {
                Storage::disk('public')->delete($oldPath);
            }
        }

        if ($request->hasFile('hero_image')) {
            $oldPath = Setting::where('key', 'hero_image_path')->value('value');
            $path = $request->file('hero_image')->store('hero', 'public');
            $heroUrl = rtrim(config('app.url'), '/') . '/media/' . ltrim($path, '/');

            Setting::updateOrCreate(['key' => 'hero_image_path'], ['value' => $path, 'is_secret' => false]);
            Setting::updateOrCreate(['key' => 'hero_image'], ['value' => $heroUrl, 'is_secret' => false]);

            if ($oldPath && $oldPath !== $path && $oldPath !== 'hero/default-hero.jpg') {
                Storage::disk('public')->delete($oldPath);
            }
        }

        $settings = Setting::where('is_secret', false)->pluck('value', 'key');

        return response()->json([
            'message' => 'Pengaturan berhasil diperbarui.',
            'data' => $this->formatSettings($settings),
        ]);
    }
}
