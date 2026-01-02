import { useState } from "react";
import { useApi } from "@/src/hooks/useApi";
import { User } from "@/src/types/user.types";

export function useUpdateMe() {
    const api = useApi();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const updateMe = async (user: User) => {
        setLoading(true);
        setError(null);

        try {
            if (!api.isAuthenticated()) {
                throw new Error("Authentication required");
            }

            const updatedUser = await api.put(`/auth/me`, 1, JSON.stringify(user)) as User;
            return updatedUser;
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
