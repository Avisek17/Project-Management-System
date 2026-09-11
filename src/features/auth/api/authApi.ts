import { api } from "@/shared/utils/api";
import type { LoginFormData } from "@/features/auth/schemas/authSchemas";
import type { LoginResponse } from "@/features/auth/types/auth.types";


export const login = async (
    data: LoginFormData
): Promise<LoginResponse>=> {
    const response = await api.post<LoginResponse>(
        "/auth/login", 
        data
    );
    return response.data;
}