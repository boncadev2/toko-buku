<?php
namespace App\Services\Audit;
use App\Models\ActivityLog; use Illuminate\Database\Eloquent\Model; use Illuminate\Contracts\Auth\Authenticatable;
class AuditService { public function log(string $action, ?Model $subject=null, ?Authenticatable $user=null, array $old=[], array $new=[], ?string $ip=null): ActivityLog { return ActivityLog::create(['user_id'=>$user?->getAuthIdentifier(),'action'=>$action,'subject_type'=>$subject?->getMorphClass(),'subject_id'=>$subject?->getKey(),'old_values'=>$old?:null,'new_values'=>$new?:null,'ip_address'=>$ip]); } }
