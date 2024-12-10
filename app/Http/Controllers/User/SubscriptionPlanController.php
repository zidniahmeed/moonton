<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\SubscriptionPlan;
use Illuminate\Http\Request;

class SubscriptionPlanController extends Controller
{
    public function index(){
         return inertia('User/Dashboard/SubscriptionPlan/Index',[
            'subscriptionPlans' => SubscriptionPlan::all()
         ]);

    }
}
