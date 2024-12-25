<?php

namespace App\Applications\Pagination;

use Illuminate\Pagination\LengthAwarePaginator;

class StarterPaginator extends LengthAwarePaginator
{
    /**
     * Get the instance as an array.
     *
     * @return array
     */
    public function toArray()
    {
        return [
            'data' => $this->items->toArray(),
            'pagination' => [
                'total'       => $this->total(),
                'count'       => $this->count(),
                'currentPage' => $this->currentPage(),
                'lastPage'  => $this->lastPage(),
                'limit'  => $this->perPage(),
                'options' => $this->getOptions(),
                'dataLength' => $this->perPage()
            ],
        ];
    }
}
