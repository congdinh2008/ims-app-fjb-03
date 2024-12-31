import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api/auth'
});

const login = async (data: any) => {
    try {
        const response = await api.post('/login', data);
        const { accessToken, user } = response.data;

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('userInformation', JSON.stringify(user));

        return response;
    } catch (error) {
        return error;
    }
};

const register = async (data: any) => {
    try {
        const response: any = await api.post('/register', data);
        return response.data;
    } catch (error) {
        console.log('Error:', error);
    }
};

export const AuthService = {
    login,
    register
}