import { useEffect, useState } from "react";
import { ApiService } from "../../lib/api/ApiService";
import { AuthenticationService } from "../../lib/services/AuthenticationService";

export interface CustomersMetrics {
  total: number;
  active: number;
  new: number;
  avgOrderValue: number;
}

export function useCustomersMetrics() {
  const [metrics, setMetrics] = useState<CustomersMetrics>({total: 0, active: 0, new: 0, avgOrderValue: 0});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const apiService = new ApiService();
      const token = new AuthenticationService().getToken();
      if (token == null) throw new Error();

      const today = new Date();
      today.setDate(today.getDate() - 30);
    
      const metrics: CustomersMetrics = {
        total: await apiService.get(`/admin/metrics/customers`, 1, token),
        active: await apiService.get(`/admin/metrics/customers?isActive=true`, 1, token),
        new: await apiService.get(`/admin/metrics/customers?from=${today.toISOString()}`, 1, token),
        avgOrderValue: await apiService.get(`/admin/metrics/orders?metric=1`, 1, token)
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
