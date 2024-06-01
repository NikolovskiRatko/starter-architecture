<?php

namespace App\Applications\User\Data;

use Illuminate\Database\Eloquent\Collection;
use Spatie\LaravelData\Attributes\MapOutputName;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\CamelCaseMapper;

#[MapOutputName(CamelCaseMapper::class)]
class UserRole extends Data
{
    public function __construct(
        public int $id,
        public string $name,
        public string $guard_name,
    ) {
    }
}
