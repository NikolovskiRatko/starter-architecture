import { computed, type ComputedRef } from 'vue';
import { useRoute } from 'vue-router';
import { parseTransformQueryString } from './helpers/parseTransformQueryString';
import type { Transformers } from './types';

type Parameters<T> = {
  values: Transformers<T>;
  defaultValues: T;
};

export const useQueryParams = <T>({
  values,
  defaultValues,
}: Parameters<T>): ComputedRef<T> => {
  const route = useRoute();

  return computed(() => {
    const queryEntries = Object.entries(route.query).flatMap(([key, value]) => {
      if (Array.isArray(value)) {
        return value.map((v) => [key, String(v)]);
      } else if (value !== null && value !== undefined) {
        return [[key, String(value)]];
      }
      return [];
    });

    const searchParams = new URLSearchParams(queryEntries as [string, string][]);

    return parseTransformQueryString({
      input: searchParams.toString(),
      values,
      defaultValues,
    });
  });
};
