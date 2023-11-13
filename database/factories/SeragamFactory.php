<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Seragam;

class SeragamFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Seragam::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'nama_seragam' => $this->faker->word,
            'kategori' => $this->faker->randomElement(["1","2","3"]),
            'foto' => $this->faker->text,
            'harga' => $this->faker->numberBetween(-10000, 10000),
        ];
    }
}
