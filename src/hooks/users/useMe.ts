import { useEffect, useState } from "react";
import { useApi } from "../useApi";
import { User } from "../../lib/models/User";

export function useMe() {
  const api = useApi();
  const [me, setMe] = useState<User>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const user = await api.get(`/auth/me`, 1) as User;
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
