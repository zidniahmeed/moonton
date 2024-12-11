<?php

namespace App\Http\Middleware;

use Auth;
use Carbon\Carbon;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;
use Illuminate\Http\Request;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    private function activePlan()
{
    $activePlan = Auth::user()?->lastActiveUserSubscription;

    if (!$activePlan) {
        return null;
    }

    $updatedAt = $activePlan->updated_at ? Carbon::parse($activePlan->updated_at) : null;
    $expiredDate = $activePlan->expired_date ? Carbon::parse($activePlan->expired_date) : null;
    $activePeriodMonths = $activePlan->subscriptionPlan->active_period_in_months ?? 0;

    if (!$updatedAt || !$expiredDate) {
        return null;
    }

    $lastDay = $updatedAt->addMonths($activePeriodMonths);
    $activeDays = $updatedAt->diffInDays($lastDay);
    $remainingActiveDays = Carbon::now()->diffInDays($expiredDate, false); // Include negative if expired

    return [
        'name' => $activePlan->subscriptionPlan->name ?? 'Unknown Plan',
        'remainingActiveDays' => max($remainingActiveDays, 0), // Ensure no negative active days
        'activeDays' => $activeDays,
    ];
}

 
    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
                'activePlan' => 'hehe'
            ],
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
        ];
    }
}
