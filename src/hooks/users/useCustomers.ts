import { useEffect, useMemo, useState } from "react";
import { useApi } from "../useApi";
import { Customer } from "../../lib/models/User";
import { ApiOptions, ApiQueryBuilder } from "../../lib/services/ApiQueryBuilder";

class UserQueryBuilder extends ApiQueryBuilder<ApiOptions> {
  protected appendCustom(): void {
    const { status } = this.options;

    if (status && status !== "all") {
      this.params.set("isActive", (status == "active").toString());
    }
  }
}

export function useCustomers(options: ApiOptions = {}) {
  const api = useApi();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const customers = await api.get(`/customers${query}`, 1);

      console.log(customers);
      setCustomers(customers);
    } catch (err: any) {
      setError(err?.message ?? String(err));
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const query = useMemo(() => {
    return new UserQueryBuilder(options).build();
  }, [options]);

  useEffect(() => {
    void fetchData();
  }, [query]);

  const refresh = () => {
    void fetchData();
  };

  return { customers, loading, error, refresh };
}
