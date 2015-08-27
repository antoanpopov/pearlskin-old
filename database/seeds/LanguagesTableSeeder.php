<?php

use Illuminate\Database\Seeder;

class LanguagesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('languages')->insert([
            'name' => 'Български',
            'code' => 'bg',
            'locale' => 'bg',
            'image' => 'bg.png',
            'file' => 'bg.json',
            'is_visible' => true,
            'sort_order' => 1,
        ]);
        DB::table('languages')->insert([
            'name' => 'English',
            'code' => 'en',
            'locale' => 'en',
            'image' => 'england.png',
            'file' => 'en.json',
            'is_visible' => true,
            'sort_order' => 2,
        ]);
        DB::table('languages')->insert([
            'name' => 'Руский',
            'code' => 'ru',
            'locale' => 'ru',
            'image' => 'bg.png',
            'file' => 'bg.json',
            'is_visible' => false,
            'sort_order' => 3,
        ]);
    }
}
