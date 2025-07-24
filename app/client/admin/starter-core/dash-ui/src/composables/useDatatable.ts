import { computed, type ComputedRef } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { DATATABLE_ORDER_DIRECTIONS, INITIAL_QUERY_DATA } from '../constants';
import { useQueryParams, TRANSFORMS } from './useQueryParams';
import type { TableQuery } from '../types';
import type { onPaginationChange } from '../components/Pagination';
import type { Transformers } from '../composables/useQueryParams';

type DatatableOptions<TCustom extends Record<string, any>> = {
  values?: Transformers<TCustom>;
  defaultValues?: Partial<TCustom>;
};

export function useDatatable<TCustom extends Record<string, any> = {}>(
    options?: DatatableOptions<TCustom>
): {
  query: ComputedRef<TableQuery & TCustom>;
  onPaginationChange: onPaginationChange;
} {
  const route = useRoute();
  const router = useRouter();

  const baseValues: Transformers<TableQuery> = {
    search: TRANSFORMS.toString,
    dir: (value: string) => {
      const isValid = Object.values(DATATABLE_ORDER_DIRECTIONS).includes(value);
      return isValid ? value : null;
    },
    column: TRANSFORMS.toString,
    length: TRANSFORMS.toNumber,
    page: TRANSFORMS.toNumber,
  };

  const baseDefaults: TableQuery = {
    search: null,
    dir: INITIAL_QUERY_DATA.dir,
    column: null,
    length: INITIAL_QUERY_DATA.length,
    page: 1,
  };

  const query = computed(() =>
      useQueryParams<TableQuery & TCustom>({
        values: {
          ...baseValues,
          ...(options?.values || {}),
        },
        defaultValues: {
          ...baseDefaults,
          ...(options?.defaultValues || {}),
        } as TableQuery & TCustom,
      })
  );

  const onPaginationChange: onPaginationChange = ({ limit, page }) => {
    router.push({
      path: route.path,
      query: {
        ...route.query,
        length: limit,
        page,
      },
    });
  };

  return {
    query,
    onPaginationChange,
  };
}
