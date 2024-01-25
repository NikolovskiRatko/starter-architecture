<?php

namespace App\Applications\Magazine\Providers;

use App\Applications\Magazine\Repositories\MagazineRepository;
use App\Applications\Magazine\Repositories\IMagazineRepository;
use App\Applications\Magazine\Services\MagazineService;
use App\Applications\Magazine\Services\IMagazineService;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class MagazineServiceProvider extends ServiceProvider
{
    /**
     * Set the service provider namespace
     *
     */
    protected $namespace = 'App\Applications\Magazine';
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
        $this->app->bind(IMagazineRepository::class, MagazineRepository::class);
        $this->app->bind(IMagazineService::class, MagazineService::class);
    }

    public function map()
    {
        Route::prefix('api')
             ->middleware('api')
             ->namespace($this->namespace)
             ->group(base_path('routes/Magazine/api.php'));
    }

}
