import useFetchWithCache from '../hooks/useFetchWithCache';

const { data: topData, loading: topLoading } = useFetchWithCache({
  key: 'topNews_v1',
  fetcher: async () => {
    const res = await newsApi.getTopNews({ limit: 15 });
    return res?.data ?? [];
  },
  deps: [],
  ttl: 1000 * 60 * 5 // 5 menit
});
