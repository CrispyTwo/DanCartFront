import { useMemo } from "react";
import { ApiService } from "../lib/helpers/api-service";
import { ProxyService } from "../lib/helpers/proxy-service";

export function useApi() {
  return useMemo(() => new ApiService(), []);
}

export function useProxy() {
  return useMemo(() => new ProxyService(), []);
}