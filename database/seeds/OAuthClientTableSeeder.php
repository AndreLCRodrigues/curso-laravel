<?php

use Illuminate\Database\Seeder;

class OAuthClientTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //\CodeProject\Entities\User::truncate();
        factory(\CodeProject\Entities\OAuthClient::class)->create([
            'id' => 'app',
            'secret' => 'secret',
            'name' => 'App',
        ]);
    }
}
