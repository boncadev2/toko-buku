<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SettingController extends Controller
{
    public function public()
    {
        return response()->json(['data' => Setting::where('is_secret', false)->pluck('value', 'key')]);
    }

    public function update(Request $request)
    {
        $data = $request->validate([
            'settings' => ['required', 'array'],
            'settings.*.key' => ['required', 'string', 'max:100'],
            'settings.*.value' => ['nullable', 'string'],
            'settings.*.is_secret' => ['nullable', 'boolean'],
            'logo' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp,svg', 'max:2048'],
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
            Setting::updateOrCreate(['key' => 'app_logo_path'], ['value' => $path, 'is_secret' => false]);
            Setting::updateOrCreate(['key' => 'app_logo'], ['value' => asset(Storage::url($path)), 'is_secret' => false]);
            if ($oldPath) Storage::disk('public')->delete($oldPath);
        }

        return response()->json(['message' => 'Pengaturan berhasil diperbarui.', 'data' => Setting::where('is_secret', false)->pluck('value', 'key')]);
    }
}
