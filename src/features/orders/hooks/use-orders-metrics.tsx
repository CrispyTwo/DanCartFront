import { useProxy } from "@/src/hooks/use-api";
import { useEffect, useState } from "react";

export interface OrdersMetrics {
  total: number;
  pending: number;
  inProgress: number;
  shipped: number;
}

export function useOrdersMetrics() {
  const api = useProxy();
  const [metrics, setMetrics] = useState<OrdersMetrics>({ total: 0, pending: 0, inProgress: 0, shipped: 0 });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const metrics: OrdersMetrics = {
        total: await api.get(`/admin/metrics/orders?metric=0`, 1),
        pending: await api.get(`/admin/metrics/orders?metric=0&status=0`, 1),
        inProgress: await api.get(`/admin/metrics/orders?metric=0&status=1`, 1),
        shipped: await api.get(`/admin/metrics/orders?metric=0&status=2`, 1),
      };

      setMetrics(metrics);
    } catch (err: any) {
      setError(err?.message ?? String(err));
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchData();
  }, []);

  const refresh = () => {
    void fetchData();
  };

  return { metrics, loading, error, refresh };
}
