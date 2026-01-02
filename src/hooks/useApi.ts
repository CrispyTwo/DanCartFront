import { useMemo } from "react";
import { ApiService } from "../lib/helpers/api-service";
import { useAuthContext } from "../features/auth/context/auth-context";

export function useApi() {
  const { authService } = useAuthContext();
  const api = useMemo(() => new ApiService(authService), [authService]);
  return api;
}
