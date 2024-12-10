<?php

namespace App\Http\Controllers\User;

use App\Models\Movie;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class DahboardController extends Controller
{
    public function index(){
        $featuredMovies = Movie::whereIsFeatured(true)->get(); 
        $movies = Movie::all(); 
        return inertia('User/Dashboard/Index',[
            'featuredMovies' => $featuredMovies,
            'movies' => $movies 
        ]);
    }
}
