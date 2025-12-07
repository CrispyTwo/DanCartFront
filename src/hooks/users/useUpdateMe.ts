import { useEffect, useState } from "react";
import { ApiService } from "../../lib/api/ApiService";
import { AuthenticationService } from "../../lib/services/AuthenticationService";
import { User } from "@/src/lib/models/User";

export function useUpdateMe() {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const updateMe = async (user: User) => {
        setLoading(true);
        setError(null);

        try {
            const apiService = new ApiService();
            const token = new AuthenticationService().getToken();

            if (!token) {
                throw new Error("Authentication required");
            }

            const updatedUser = await apiService.put(`/auth/me`, 1, JSON.stringify(user), token) as User;
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
