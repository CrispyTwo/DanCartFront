import { useState } from "react";
import { useProxy } from "@/src/hooks/use-api";
import { User } from "@/src/types/user.types";

export function useUpdateMe() {
    const api = useProxy();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const updateMe = async (user: User) => {
        setLoading(true);
        setError(null);

        try {
            return await api.put(`/auth/me`, 1, JSON.stringify(user));
        } catch (err: any) {
            const errorMessage = err?.message ?? String(err);
            setError(errorMessage);
            console.error(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { updateMe, loading, error };
}
