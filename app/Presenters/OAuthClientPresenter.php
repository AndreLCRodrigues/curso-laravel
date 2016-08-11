<?php
/**
 * Created by PhpStorm.
 * OAuthClient: andre
 * Date: 12/06/2016
 * Time: 17:34
 */

namespace CodeProject\Presenters;

use CodeProject\Transformers\OAuthClientTransformer;
use Prettus\Repository\Presenter\FractalPresenter;


class OAuthClientPresenter extends FractalPresenter
{
    public function getTransformer()
    {
        return new OAuthClientTransformer();
    }
}