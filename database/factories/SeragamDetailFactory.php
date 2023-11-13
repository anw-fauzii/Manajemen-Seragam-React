<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Seragam;
use App\Models\SeragamDetail;

class SeragamDetailFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = SeragamDetail::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'seragam_id' => Seragam::factory(),
            'ukuran' => $this->faker->numberBetween(-10000, 10000),
            'stok' => $this->faker->numberBetween(-10000, 10000),
        ];
    }
}
