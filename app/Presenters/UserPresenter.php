<?php
/**
 * Created by PhpStorm.
 * User: andre
 * Date: 12/06/2016
 * Time: 17:34
 */

namespace CodeProject\Presenters;

use CodeProject\Transformers\UserTransformer;
use Prettus\Repository\Presenter\FractalPresenter;


class UserPresenter extends FractalPresenter
{
    public function getTransformer()
    {
        return new UserTransformer();
    }
}