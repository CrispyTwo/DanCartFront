import { useEffect, useState } from "react";
import { ApiService } from "../../lib/api/ApiService";
import { AuthenticationService } from "../../lib/services/AuthenticationService";
import { User } from "@/src/lib/models/User";

export function useMe() {
  const [me, setMe] = useState<User>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const apiService = new ApiService();
      const token = new AuthenticationService().getToken();
      if (token == null) throw new Error();

      const user = await apiService.get(`/auth/me`, 1, token) as User;
      console.log(user);
      
      setMe(user);
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

  return { me, loading, error };
}
