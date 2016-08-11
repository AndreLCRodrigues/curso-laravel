<?php

namespace CodeProject\Http\Middleware;

use Closure;
use CodeProject\Services\ProjectService;

class CheckProjectPermission
{
    /**
     * @var ProjectService
     */
    private $service;

    public function __construct(ProjectService $service)
    {
        $this->service = $service;
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if($request->route('projectId')){
            $projectId = $request->route('projectId');
        }else{
            if($request->route('id')){
                $projectId = $request->route('id');
            }else{
                $projectId = $request->route('projects');
            }
        }

        if($this->service->checkProjectPermissions($projectId) == false){
            return ['error' => "You haven't permission to access project"];
        }

        return $next($request);
    }
}
