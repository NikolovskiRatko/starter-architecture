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
                'label' => 'strings.dashboard',
                'name' => 'item_dashboard',
                'link' => 'dashboard',
                'permission' => 'read-users', // Change to dashboard_view
            ],
            [
                'label' => 'strings.users.main',
                'name' => 'item_users',
                'link' => 'users',
                'expanded' => false,
                'permission' => 'read-users',
                'subcategories' => [
                    [
                        'label' => 'strings.users.admin',
                        'name' => 'item_users',
                        'link' => 'users',
                        'permission' => 'read-users',
                    ],
                    [
                        'label' => 'strings.users.public',
                        'name' => 'item_users_public',
                        'link' => 'users.public',
                        'permission' => 'read-users',
                    ],
                ]
            ],
            [
                'label' => 'components.label',
                'name' => 'components',
                'link' => 'components',
                'expanded' => false,
                'permission' => 'read-users',
                'subcategories' => [
                    [
                        'label' => 'components.portlets.label',
                        'name' => 'components.portlets',
                        'link' => 'components.portlets',
                        'permission' => 'read-users',
                    ],
                    [
                        'label' => 'components.buttons.label',
                        'name' => 'components.buttons',
                        'link' => 'components.buttons',
                        'permission' => 'read-users',
                    ]
                ]
            ]
        ];

        $data = [
            'mainMenu' => $mainMenu,
        ];

        return $data;
    }
}
