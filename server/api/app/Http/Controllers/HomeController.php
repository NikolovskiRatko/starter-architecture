<?php
namespace App\Http\Controllers;

class HomeController extends Controller
{
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View
     */
    public function index()
    {
        return view('app');
    }

    /**
     * Get initial data for Vue.js application
     */
    public function vue()
    {
        $mainMenu = [
            [
                'label' => 'admin.dashboard',
                'name' => 'item_dashboard',
                'link' => 'dashboard',
                'permission' => 'read_users', // Change to dashboard_view
            ],
            [
                'label' => 'admin.users.main',
                'name' => 'item_users',
                'link' => 'users',
                'expanded' => false,
                'permission' => 'read_users',
                'subcategories' => [
                    [
                        'label' => 'admin.users.admin',
                        'name' => 'item_users',
                        'link' => 'users',
                        'permission' => 'read_users',
                    ],
                    [
                        'label' => 'admin.users.public',
                        'name' => 'item_users_public',
                        'link' => 'users.public',
                        'permission' => 'read_users',
                    ],
                ]
            ]
        ];

        $data = [
            'mainMenu' => $mainMenu,
        ];

        return $data;
    }
}
