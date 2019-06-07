<?php
/**
 * This controller is used to say something out.
 * php version 7.3.3
 *
 * @category Controller
 * @package  App\Http\Controllers
 * @author   BuyingWang <wangbuying@gmail.com>
 * @license  Apache 2.0
 * @link     none
 */
namespace App\Http\Controllers;

use Illuminate\Http\Request;

/**
 * Hello
 *
 * @category Controller
 * @package  App\Http\Controllers
 * @author   BuyingWang <wangbuying@gmail.com>
 * @license  Apache 2.0
 * @version  Release: 1.0.0
 * @link     none
 */
class HelloController extends Controller
{
    /**
     * Say specified words or default say world.
     *
     * @param \Illuminate\Http\Request $request Instace of Psr7\Request
     *
     * @return string
     */
    public function say(Request $request)
    {
        $word = $request->get('word', 'world');
        return "Hello $word";
    }
}
