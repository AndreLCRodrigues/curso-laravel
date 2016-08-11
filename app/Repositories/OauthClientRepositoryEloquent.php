<?php

namespace CodeProject\Repositories;

use CodeProject\Entities\OAuthClient;
use CodeProject\Presenters\OAuthClientPresenter;
use Prettus\Repository\Eloquent\BaseRepository;

/**
 * Class ClientRepositoryEloquent
 * @package namespace CodeProject\Repositories;
 */
class OAuthClientRepositoryEloquent extends BaseRepository implements OAuthClientRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model(){
        return OAuthClient::class;
    }

    public function presenter()
    {
        return OAuthClientPresenter::class;
    }
}