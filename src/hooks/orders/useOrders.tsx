import { useEffect, useMemo, useState } from "react";
import { useApi } from "../useApi";
import { Order } from "../../lib/models/Order";
import { ApiOptions, ApiQueryBuilder } from "@/src/lib/services/ApiQueryBuilder";

export function useOrders(options: ApiOptions = {}) {
  const api = useApi();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const orders = await api.get(`/salesOrders${query}`, 1);

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
