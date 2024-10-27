<?php
namespace App\Applications\Navigation\Providers;

use App\Applications\Navigation\Repositories\NavigationRepository;
use App\Applications\Navigation\Repositories\NavigationRepositoryInterface;
use App\Applications\Navigation\Services\NavigationService;
use App\Applications\Navigation\Services\NavigationServiceInterface;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class NavigationServiceProvider extends ServiceProvider
{
    /**
     * Set the service provider namespace.
     *
     * @var string
     */
    protected $namespace = 'App\Applications\Navigation';

    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        if (!$this->app->routesAreCached()) {
            $this->map();
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
        $this->app->bind(NavigationRepositoryInterface::class, NavigationRepository::class);
        $this->app->bind(NavigationServiceInterface::class, NavigationService::class);
    }

    /**
     * Map the navigation routes.
     *
     * @return void
     */
    protected function map()
    {
        Route::prefix('api')
            ->middleware('api')
            ->namespace($this->namespace)
            ->group(base_path('routes/Navigation/api.php'));
    }
}
