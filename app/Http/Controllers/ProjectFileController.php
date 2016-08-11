<?php

namespace CodeProject\Http\Controllers;

use CodeProject\Repositories\ProjectFileRepository;
use CodeProject\Services\ProjectFileService;
use Illuminate\Http\Request;

class ProjectFileController extends Controller
{
    /**
     * @var ProjectFileRepository
     */
    private $repository;
    /**
     * @var ProjectFileService
     */
    private $service;

    /**
     * ProjectController constructor.
     * @param ProjectFileRepository $repository
     * @param ProjectFileService $service
     */
    public function __construct(ProjectFileRepository $repository, ProjectFileService $service)
    {
        $this->repository = $repository;
        $this->service = $service;

        $this->middleware('check-project-permission');
    }

    /**
     * Display a listing of the resource.
     *
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
        $file = $request->file('file');
        $extension = $file->getClientOriginalExtension();

        $data['file'] = $file;
        $data['extension'] = $extension;
        $data['name'] = $request->name;
        $data['project_id'] = $projectId;
        $data['description'] = $request->description;

        return $this->service->create($data);
    }

    /**
     * Download the specified file.
     *
     * @param  int  $id
     * @return Download file
     */
    public function showFile($id, $fileId)
    {
        if($this->service->checkProjectPermissions($id) == false){
            return ['error' => 'Access forbidden'];
        }

        $filePath = $this->service->getFilePath($fileId);
        $fileContent = file_get_contents($filePath);
        $file64 = base64_encode($fileContent);
        return [
            'file' => $file64,
            'size' => filesize($filePath),
            'name' => $this->service->getFileName($fileId)
        ];
        //return response()->download($this->service->getFilePath($fileId));
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
        if($this->service->checkProjectOwner($projectId) == false){
            return ['error' => 'Access forbidden'];
        }

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
        return ['success' => $this->service->delete($id)];
    }
}
