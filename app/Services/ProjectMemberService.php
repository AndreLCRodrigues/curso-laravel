<?php
/**
 * Created by PhpStorm.
 * User: andre
 * Date: 01/05/2016
 * Time: 20:49
 */

namespace CodeProject\Services;


use CodeProject\Repositories\ProjectMemberRepository;
use CodeProject\Validators\ProjectMemberValidator;
use Prettus\Validator\Exceptions\ValidatorException;

class ProjectMemberService
{
    /**
     * @var ProjectMemberRepository
     */
    protected $repository;
    /**
     * @var ProjectMemberValidator
     */
    protected $validator;

    public function __construct(ProjectMemberRepository $repository, ProjectMemberValidator $validator){
        $this->repository = $repository;
        $this->validator = $validator;
    }

    public function create(array $data){
        try{
            $this->validator->with($data)->passesOrFail();
            return $this->repository->create($data);
        } catch (ValidatorException $e){
            return [
                'error' => true,
                'message' => $e->getMessageBag()
            ];
        }
    }

    public function delete($id){
        $projectMember = $this->repository->skipPresenter()->find($id);
        return $projectMember->delete();
    }
}