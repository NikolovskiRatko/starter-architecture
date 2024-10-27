<?php

namespace App\Applications\Navigation\Providers;

use App\Applications\Navigation\Repositories\NavigationRepository;
use App\Applications\Navigation\Repositories\NavigationRepositoryInterface;
use App\Applications\Navigation\Repositories\NavigationMenuRepository;
use App\Applications\Navigation\Repositories\NavigationMenuRepositoryInterface;
use App\Applications\Navigation\Repositories\NavigationMenuItemRepository;
use App\Applications\Navigation\Repositories\NavigationMenuItemRepositoryInterface;
use App\Applications\Navigation\Services\NavigationService;
use App\Applications\Navigation\Services\NavigationServiceInterface;
use App\Applications\Navigation\Services\NavigationMenuService;
use App\Applications\Navigation\Services\NavigationMenuServiceInterface;
use App\Applications\Navigation\Services\NavigationMenuItemService;
use App\Applications\Navigation\Services\NavigationMenuItemServiceInterface;
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
        // Bind Navigation services
        $this->app->bind(NavigationRepositoryInterface::class, NavigationRepository::class);
        $this->app->bind(NavigationServiceInterface::class, NavigationService::class);

        // Bind NavigationMenu services
        $this->app->bind(NavigationMenuRepositoryInterface::class, NavigationMenuRepository::class);
        $this->app->bind(NavigationMenuServiceInterface::class, NavigationMenuService::class);

        // Bind NavigationMenuItem services
        $this->app->bind(NavigationMenuItemRepositoryInterface::class, NavigationMenuItemRepository::class);
        $this->app->bind(NavigationMenuItemServiceInterface::class, NavigationMenuItemService::class);
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
