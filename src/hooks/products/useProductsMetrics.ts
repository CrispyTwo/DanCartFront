import { useEffect, useState } from "react";
import { ApiService } from "../../lib/api/ApiService";
import { AuthenticationService } from "../../lib/services/AuthenticationService";

export interface ProductMetrics {
  total: number;
  active: number;
  lowStock: number;
  outOfStock: number;
}

export function useProductsMetrics() {
  const [metrics, setMetrics] = useState<ProductMetrics>({total:0, active:0, lowStock:0, outOfStock:0});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const apiService = new ApiService();
      const token = new AuthenticationService().getToken();
      if (token == null) throw new Error();

      const metrics: ProductMetrics = {
        total: await apiService.get(`/admin/metrics/products`, 1, token),
        active: await apiService.get(`/admin/metrics/products?productStatus=0`, 1, token),
        lowStock: await apiService.get(`/admin/metrics/products?productStatus=1`, 1, token),
        outOfStock: await apiService.get(`/admin/metrics/products?productStatus=2`, 1, token),
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
