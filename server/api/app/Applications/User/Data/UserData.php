<?php

namespace App\Applications\User\Data;

use App\Applications\Pagination\StarterPaginator;
use Illuminate\Database\Eloquent\Collection;
//use Spatie\LaravelData\Attributes\MapOutputName;
use Spatie\LaravelData\Data;
//use Spatie\LaravelData\Mappers\CamelCaseMapper;

//#[MapOutputName(CamelCaseMapper::class)]
class UserData extends Data
{
    public function __construct(
        public int $id,
        public string $first_name,
        public string $last_name,
        public string $email,
        public int $is_disabled,
        public int $role,
        public array $permissions_array
    ) {
    }

    //TODO: Try to filter out data returned for the tables
    // public function tableColumns(): array
    // {
    //     return $this->except('role')->toArray();
    // }

    public static function tableData(StarterPaginator $items): Collection
    {
        return new Collection(
            parent::collect($items)
        );
        //TODO: Try to filter out data returned for the tables
        // return new Collection(
        //     parent::collect($items),
        //     array_map(fn (UserData $user) => $user->first_name, $items)
        // );
    }
}
