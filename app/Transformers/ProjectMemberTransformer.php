<?php
/**
 * Created by PhpStorm.
 * User: andre
 * Date: 12/06/2016
 * Time: 16:34
 */

namespace CodeProject\Transformers;

use CodeProject\Entities\ProjectMember;
use League\Fractal\TransformerAbstract;

class ProjectMemberTransformer extends TransformerAbstract
{

    protected $defaultIncludes = [
        'user'
    ];

    public function transform(ProjectMember $projectMember)
    {
        return [
            'id' => $projectMember->id,
            'project_id' => $projectMember->project_id
        ];
    }

    public function includeUser(ProjectMember $projectMember){
        return $this->item($projectMember->member, new UserTransformer());
    }

}