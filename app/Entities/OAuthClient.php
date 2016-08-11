<?php

namespace CodeProject\Entities;

use Illuminate\Database\Eloquent\Model;

class OAuthClient extends Model
{

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'oauth_clients';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['id', 'secret', 'name'];
}
