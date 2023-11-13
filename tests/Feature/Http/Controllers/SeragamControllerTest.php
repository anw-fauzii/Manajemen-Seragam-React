<?php

namespace Tests\Feature\Http\Controllers;

use App\Models\Seragam;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * @see \App\Http\Controllers\seragamController
 */
class SeragamControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @test
     */
    public function index_behaves_as_expected(): void
    {
        $seragams = seragam::factory()->count(3)->create();

        $response = $this->get(route('seragam.index'));
    }
}
