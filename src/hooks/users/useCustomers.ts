import { useEffect, useMemo, useState } from "react";
import { ApiService } from "../../lib/api/ApiService";
import { AuthenticationService } from "../../lib/services/AuthenticationService";
import { Customer } from "@/src/lib/models/User";
import { ApiOptions, ApiQueryBuilder } from "@/src/lib/api/ApiQueryBuilder";

class UserQueryBuilder extends ApiQueryBuilder<ApiOptions> {
  protected appendCustom(): void {
    const { status } = this.options;

    if (status && status !== "all") {
      this.params.set("isActive", (status == "active").toString());
    }
  }
}

export function useCustomers(options: ApiOptions = {}) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const apiService = new ApiService();
      const token = new AuthenticationService().getToken();
      if (token == null) throw new Error();
      
      const customers = await apiService.get(`/customers${query}`, 1, token);

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
