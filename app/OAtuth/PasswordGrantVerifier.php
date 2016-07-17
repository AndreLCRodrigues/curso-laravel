<?php
/**
 * Created by PhpStorm.
 * User: andre
 * Date: 11/06/2016
 * Time: 22:04
 */

namespace CodeProject\OAtuth;

use Illuminate\Support\Facades\Auth;

class PasswordGrantVerifier
{
    public function verify($username, $password)
    {
        $credentials = [
            'email'    => $username,
            'password' => $password,
        ];

        if (Auth::once($credentials)) {
            return Auth::user()->id;
        }

        return false;
    }
}