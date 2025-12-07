import { useState, useEffect } from "react";
import { ApiService } from "../../lib/api/ApiService";
import { AuthenticationService } from "../../lib/services/AuthenticationService";
import { Product } from "../../lib/models/Product";

export function useProduct(id: string) {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            setError(null);
            try {
                const apiService = new ApiService();
                const token = new AuthenticationService().getToken();
                if (token == null) throw new Error();

                const data = await apiService.get(`/products/${id}`, 1, token);
                setProduct(data);
            } catch (err: any) {
                setError(err.message || "Failed to fetch product");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            void fetchProduct();
        }
    }, [id]);

    return { product, loading, error };
}
