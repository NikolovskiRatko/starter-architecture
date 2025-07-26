import { useRoute, useRouter } from 'vue-router';

export function useUpdateQueryParams() {
  const router = useRouter();
  const route = useRoute();

  const update = (params: Record<string, string | number | null>) => {
    const newQuery = Object.entries({
      ...route.query,
      ...params,
    }).reduce((acc, entry) => {
      if (entry[1]) {
        acc[entry[0]] = entry[1];
      }

      return acc;
    }, {});

    router.push({
      path: route.path,
      query: newQuery,
    });
  };

  return { update };
}
