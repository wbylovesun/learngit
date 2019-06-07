<?php
/**
 * This controller is used to say something out.
 */
namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HelloController extends Controller
{
    /**
     * Say specified words or default say world.
     */
    public function say(Request $request)
    {
        $word = $request->get('word', 'world');
        return "Hello $word";
    }

}
