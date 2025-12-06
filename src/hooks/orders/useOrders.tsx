import { useEffect, useMemo, useState } from "react";
import { ApiService } from "../../lib/api/ApiService";
import { AuthenticationService } from "../../lib/services/AuthenticationService";
import { Order } from "../../lib/models/Order";
import { ApiOptions, ApiQueryBuilder } from "@/src/lib/api/ApiQueryBuilder";

export function useOrders(options: ApiOptions = {}) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const apiService = new ApiService();
      const token = new AuthenticationService().getToken();
      if (token == null) throw new Error();

      const orders = await apiService.get(`/salesOrders${query}`, 1, token);

      console.log(orders);
      setOrders(orders);
    } catch (err: any) {
      setError(err?.message ?? String(err));
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const query = useMemo(() => {
    return new ApiQueryBuilder(options).build(); 
  }, [options]);

  useEffect(() => {
    void fetchData();
  }, [query]);

  const refresh = () => {
    void fetchData();
  };

  return { orders, loading, error, refresh };
}
