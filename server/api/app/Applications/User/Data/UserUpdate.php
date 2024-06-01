<?php

namespace App\Applications\User\Data;

use Spatie\LaravelData\Attributes\MapInputName;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\CamelCaseMapper;

#[MapInputName(CamelCaseMapper::class)]
class UserUpdate extends Data
{
    public function __construct(
        public string $first_name,
        public string $last_name,
        public string $email,
        public int $is_disabled,
        public int $role
    ) {
    }
}
