import { useMemo } from "react";
import { ApiService } from "../lib/services/ApiService";
import { useAuthContext } from "../context/AuthContext";

export function useApi() {
    const { authService } = useAuthContext();
    const api = useMemo(() => new ApiService(authService), [authService]);
    return api;
}
