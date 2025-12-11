import { useState, useEffect } from "react";
import { useApi } from "../useApi";
import { Product } from "../../lib/models/Product";

export function useProduct(id: string) {
    const api = useApi();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await api.get(`/products/${id}`, 1);
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
