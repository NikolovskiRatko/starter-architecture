<?php

namespace App\Applications\User\Providers;

use App\Applications\User\Repositories\UserRepository;
use App\Applications\User\Repositories\UserRepositoryInterface;
use App\Applications\User\Services\UserService;
use App\Applications\User\Services\UserServiceInterface;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class UserServiceProvider extends ServiceProvider
{
    /**
     * Set the service provider namespace
     *
     */
    protected $namespace = 'App\Applications\User';
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        if ($this->app->routesAreCached()) {
         //  This is already done in the main RouteServiceProvider so not needed here
        } else {

            $this->app->call([$this, 'map']);

            $this->app->booted(function () {
                $this->app['router']->getRoutes()->refreshNameLookups();
                $this->app['router']->getRoutes()->refreshActionLookups();
            });
        }
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(UserRepositoryInterface::class, UserRepository::class);
        $this->app->bind(UserServiceInterface::class, UserService::class);
    }

    public function map()
    {
        Route::prefix('api')
             ->middleware('api')
             ->namespace($this->namespace)
             ->group(base_path('routes/User/api.php'));
    }

}
