<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Carbon;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    /**
     * Determine if the user has an active subscription.
     *
     * @return bool
     */
    public function getIsActiveAttribute(): bool
    {
        if (!$this->lastActiveUserSubscription) {
            return false;
        }
        $dateNow = Carbon::now();
        $dateExpired = $this->lastActiveUserSubscription->expired_date 
            ? Carbon::create($this->lastActiveUserSubscription->expired_date) 
            : null;

        return $dateExpired && $dateNow->lessThanOrEqualTo($dateExpired);
    }

    /**
     * Relationship with the UserSubscription model.
     *
     * @return HasOne
     */
    public function lastActiveUserSubscription(): HasOne
    {
        return $this->hasOne(UserSubscription::class)
            ->where('payment_status', 'paid')
            ->latest();
    }
}
