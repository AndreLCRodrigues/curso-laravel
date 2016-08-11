<?php

namespace CodeProject\Http\Controllers;

use CodeProject\Repositories\ProjectMemberRepository;
use CodeProject\Services\ProjectMemberService;
use Illuminate\Http\Request;

class ProjectMemberController extends Controller
{
    /**
     * @var ProjectMemberRepository
     */
    private $repository;
    /**
     * @var ProjectMemberService
     */
    private $service;

    /**
     * ProjectController constructor.
     * @param ProjectMemberRepository $repository
     * @param ProjectMemberService $service
     */
    public function __construct(ProjectMemberRepository $repository, ProjectMemberService $service)
    {
        $this->repository = $repository;
        $this->service = $service;

        $this->middleware('check-project-owner', ['except' => ['index','show']]);
        $this->middleware('check-project-permission', ['except' => ['store','destroy']]);
    }

    /**
     * Display a listing of the resource.
     *
     * @param $projectId
     * @return \Illuminate\Http\Response
     */
    public function index($projectId)
    {
        return $this->repository->findWhere(['project_id' => $projectId]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, $projectId)
    {
        $data = $request->all();
        $data['project_id'] = $projectId;
        return $this->service->create($data);
    }

    /**
     * Display the specified resource.
     *
     * @param $projectId
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($projectId, $id)
    {
        $result = $this->repository->findWhere(['project_id' => $projectId, 'id' => $id]);

        if(isset($result['data']) and count($result['data']) == 1){
            $result['data'] = $result['data'][0];
        }

        return $result;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param $projectId
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $projectId, $id)
    {
        return $this->service->update($request->all(), $id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param $projectId
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($projectId, $id)
    {
       return ['success' => $this->repository->delete($id)];
    }
}
