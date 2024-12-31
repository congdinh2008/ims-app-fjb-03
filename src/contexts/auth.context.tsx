import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface AuthContextType {
    isAuthenticated: boolean;
    login: (data: any) => void;
    logout: () => void;
    userInformation?: any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
        localStorage.getItem('accessToken') ? true : false
    );
    const [userInformation, setUserInformation] = useState<any>(
        JSON.parse(localStorage.getItem('userInformation') || '')
    );

    // Check if user is already authenticated based on token in local storage
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            setIsAuthenticated(true);
            setUserInformation(JSON.parse(localStorage.getItem('userInformation') || ''));
        }
    }, []);

    // Nhận data từ login form và set isAuthenticated thành true nếu như user đăng nhập thành công
    const login = async (data: any) => {
        if (data) {
            debugger
            setIsAuthenticated(true);
            setUserInformation(data.user);
        } else {
            setIsAuthenticated(false);
            setUserInformation(null);
        }
    }

    // Xoá toàn bộ data logged in của user khi logout
    const logout = () => {
        setIsAuthenticated(false);
        setUserInformation(null);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userInformation');
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, userInformation }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context; // object { isAuthenticated, login, logout, userInformation }
}