import { AxiosError } from "axios";
import { tesloApi } from "../api/teslo.api";

export interface LoginResponse {
    id:       string;
    email:    string;
    fullName: string;
    isActive: boolean;
    roles:    string[];
    token:    string;
}

export class AuthService {
    // static para poder llamarlo asi => AuthService.login()
    static login = async (email: string, password: string): Promise<LoginResponse> => {
        try {
            const {data} = await tesloApi.post<LoginResponse>('/auth/login', { email, password });
            return data;
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response?.data);
                throw new Error(error.response?.data.message || 'Error en la solicitud de inicio de sesión');
            }
            console.log(error);
            throw new Error('Error en la solicitud de inicio de sesión');
        }
    }

    static checkStatus = async (): Promise<LoginResponse> => {
        try {
            const {data} = await tesloApi.get<LoginResponse>('/auth/check-status');
            return data;
        } catch (error) {
            console.log(error);
            throw new Error('Error en la solicitud de verificación de estado');
        }
    }
}