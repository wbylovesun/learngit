<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HelloController extends Controller
{
    public function say(Request $request)
    {
        $word = $request->get('word', 'world');
        return "Hello $word";
    }
}