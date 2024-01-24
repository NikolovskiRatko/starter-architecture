<?php

namespace App\Applications\Product\Providers;

use App\Applications\Product\Repositories\ProductRepository;
use App\Applications\Product\Repositories\ProductRepositoryInterface;
use App\Applications\Product\Services\ProductService;
use App\Applications\Product\Services\ProductServiceInterface;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class ProductServiceProvider extends ServiceProvider
{
    /**
     * Set the service provider namespace
     *
     */
    protected $namespace = 'App\Applications\Product';
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
        $this->app->bind(ProductRepositoryInterface::class, ProductRepository::class);
        $this->app->bind(ProductServiceInterface::class, ProductService::class);
    }

    public function map()
    {
        Route::prefix('api')
             ->middleware('api')
             ->namespace($this->namespace)
             ->group(base_path('routes/Product/api.php'));
    }

}
