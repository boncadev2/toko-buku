<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller; use App\Models\Setting; use Illuminate\Http\Request;
class SettingController extends Controller { public function public() { return response()->json(['data'=>Setting::where('is_secret',false)->pluck('value','key')]); } public function update(Request $r) { $d=$r->validate(['settings'=>['required','array'],'settings.*.key'=>['required','string','max:100'],'settings.*.value'=>['nullable','string'],'settings.*.is_secret'=>['boolean']]); foreach($d['settings'] as $s) Setting::updateOrCreate(['key'=>$s['key']],['value'=>$s['value']??null,'is_secret'=>$s['is_secret']??false]); return response()->json(['message'=>'Settings diperbarui.']); } }
