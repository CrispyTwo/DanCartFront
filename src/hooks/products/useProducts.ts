import { useEffect, useMemo, useState } from "react";
import { AuthenticationService } from "../../lib/services/AuthenticationService";
import { Product } from "../../lib/models/Product";
import { ApiService } from "../../lib/api/ApiService";
import { ApiOptions, ApiQueryBuilder } from "@/src/lib/api/ApiQueryBuilder";

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
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const apiService = new ApiService();
      const token = new AuthenticationService().getToken();
      if (token == null) throw new Error();

      const products = await apiService.get(`/products${query}`, 1, token);
      console.log(query);
      console.log(products);
      setProducts(products);
    } catch (err: any) {
      setError(err?.message ?? String(err));
      console.log(err);
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
