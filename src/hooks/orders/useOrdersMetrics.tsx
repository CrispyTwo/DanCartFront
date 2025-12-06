import { useEffect, useState } from "react";
import { ApiService } from "../../lib/api/ApiService";
import { AuthenticationService } from "../../lib/services/AuthenticationService";

export interface OrdersMetrics {
  total: number;
  pending: number;
  inProgress: number;
  shipped: number;
}

export function useOrdersMetrics() {
  const [metrics, setMetrics] = useState<OrdersMetrics>({total:0, pending:0, inProgress:0, shipped:0});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const apiService = new ApiService();
      const token = new AuthenticationService().getToken();
      if (token == null) throw new Error();

      const metrics: OrdersMetrics = {
        total: await apiService.get(`/admin/metrics/orders?metric=0`, 1, token),
        pending: await apiService.get(`/admin/metrics/orders?metric=0&status=0`, 1, token),
        inProgress: await apiService.get(`/admin/metrics/orders?metric=0&status=1`, 1, token),
        shipped: await apiService.get(`/admin/metrics/orders?metric=0&status=2`, 1, token),
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
