<?php

namespace Database\Seeders;

use App\Applications\Navigation\Model\Navigation;
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

        // Optionally, add a child under "About Us"
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
    }
}
