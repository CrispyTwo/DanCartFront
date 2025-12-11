import { useEffect, useState } from "react";
import { useApi } from "../useApi";

export interface ProductMetrics {
  total: number;
  active: number;
  lowStock: number;
  outOfStock: number;
}

export function useProductsMetrics() {
  const api = useApi();
  const [metrics, setMetrics] = useState<ProductMetrics>({ total: 0, active: 0, lowStock: 0, outOfStock: 0 });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const metrics: ProductMetrics = {
        total: await api.get(`/admin/metrics/products`, 1),
        active: await api.get(`/admin/metrics/products?productStatus=0`, 1),
        lowStock: await api.get(`/admin/metrics/products?productStatus=1`, 1),
        outOfStock: await api.get(`/admin/metrics/products?productStatus=2`, 1),
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
