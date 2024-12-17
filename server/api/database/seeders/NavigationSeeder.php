<?php

namespace Database\Seeders;

use App\Applications\Navigation\Model\Navigation;
use App\Applications\Navigation\Model\NavigationMenu;
use Illuminate\Database\Seeder;

class NavigationSeeder extends Seeder
{
    public function run()
    {
        // Create the root "Home" navigation
        $home = Navigation::create([
            'title' => 'Home',
            'slug' => '',
            'authorized' => false,
            'visible' => true,
            'livedate' => now(),
            'enddate' => null,
            'static' => true,
        ]);

        // Create "About Us" navigation under "Home"
        $aboutUs = Navigation::create([
            'title' => 'About Us',
            'slug' => 'about-us',
            'authorized' => false,
            'visible' => true,
            'livedate' => now(),
            'enddate' => null,
            'parent_id' => $home->id,
            'static' => true,
        ]);

        // Create "Contact" navigation under "Home"
        $contact = Navigation::create([
            'title' => 'Contact',
            'slug' => 'contact',
            'authorized' => false,
            'visible' => true,
            'livedate' => now(),
            'enddate' => null,
            'parent_id' => $home->id,
            'static' => true,
        ]);

        // Add a child under "About Us"
        Navigation::create([
            'title' => 'Our Team',
            'slug' => 'our-team',
            'authorized' => false,
            'visible' => true,
            'livedate' => now(),
            'enddate' => null,
            'parent_id' => $aboutUs->id,
            'static' => true,
        ]);

        // Create "Top menu" and "Footer menu" containers
        $topMenu = NavigationMenu::create([
            'slug' => 'top-menu',
            'name' => 'Top Menu',
            'description' => 'This is the top navigation menu',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $footerMenu = NavigationMenu::create([
            'slug' => 'footer-menu',
            'name' => 'Footer Menu',
            'description' => 'This is the footer navigation menu',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Add "Home" and "Contact" to "Top Menu"
        $topMenu->items()->create([
            'label' => 'Home',
            'navigation_id' => $home->id,
            'order' => 1,
        ]);

        $topMenu->items()->create([
            'label' => 'Contact',
            'navigation_id' => $contact->id,
            'order' => 2,
        ]);

        // Add "About Us" to "Footer Menu"
        $topMenu->items()->create([
            'label' => 'About Us',
            'navigation_id' => $aboutUs->id,
            'order' => 3,
        ]);

        // Add an external link to "Footer Menu"
        $footerMenu->items()->create([
            'label' => 'Privacy Policy',
            'external_url' => 'https://example.com/privacy-policy',
            'order' => 1,
        ]);
    }
}
