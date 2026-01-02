import { useEffect, useState } from "react";
import { useApi } from "@/src/hooks/useApi";

export interface CustomersMetrics {
  total: number;
  active: number;
  new: number;
  avgOrderValue: number;
}

export function useCustomersMetrics() {
  const api = useApi();
  const [metrics, setMetrics] = useState<CustomersMetrics>({ total: 0, active: 0, new: 0, avgOrderValue: 0 });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const today = new Date();
      today.setDate(today.getDate() - 30);

      const metrics: CustomersMetrics = {
        total: await api.get(`/admin/metrics/customers`, 1),
        active: await api.get(`/admin/metrics/customers?isActive=true`, 1),
        new: await api.get(`/admin/metrics/customers?from=${today.toISOString()}`, 1),
        avgOrderValue: await api.get(`/admin/metrics/orders?metric=1`, 1)
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
