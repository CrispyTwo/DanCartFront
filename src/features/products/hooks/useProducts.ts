import { useApi } from "@/src/hooks/useApi";
import { ApiOptions, ApiQueryBuilder } from "@/src/lib/helpers/api-query-builder";
import { Product } from "@/src/types/product.types";
import { useEffect, useMemo, useState } from "react";


type ProductApiOptions = ApiOptions & {
  categories?: string[];
  priceRange?: string;
}

class ProductQueryBuilder extends ApiQueryBuilder<ProductApiOptions> {
  protected appendCustom(): void {
    const { status, categories, priceRange } = this.options;

    if (status && status !== "all") {
      this.params.set("status", status.toString());
    }

    if (categories && categories.length > 0) {
      this.params.set("categories", categories.join(","));
    }

    if (priceRange && priceRange !== "") {
      this.params.set("priceRange", priceRange);
    }
  }
}

export function useProducts(options: ApiOptions = {}) {
  const api = useApi();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const products = await api.get(`/products${query}`, 1) as Product[];
      setProducts(products);
      console.log(products);
    } catch (err: any) {
      setError(err?.message ?? String(err));
      console.error("Fetch failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const query = useMemo(() => {
    return new ProductQueryBuilder(options).build();
  }, [options]);

  useEffect(() => {
    void fetchData();
  }, [query]);

  const refresh = () => {
    void fetchData();
  };

  return { products, loading, error, refresh };
}
