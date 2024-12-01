import API_URL from "../apiConfig";
import axios from 'axios';
import { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContextType, User } from "types/auth";

export const AuthContext = createContext<AuthContextType>({
    user: null,
    login: async (email: string, password: string) => false,
    logout: async () => {},
    loading: false,
});

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    const login = async (email: string, password: string): Promise<boolean> => {
        try {
            const response = await axios.post(`${API_URL}/api/AccountAPI/login`, {
                email,
                password
            }, { withCredentials: true });

            if (response.status === 200) {
                const userData = response.data;
                setUser(userData);
                return true;
            } else {
                console.error('Login failed');
                return false;
            }
        } catch (error) {
            console.error('Error during login', error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            const response = await axios.post(`${API_URL}/api/AccountAPI/logout`, {}, { withCredentials: true });

            if (response.status === 200) {
                setUser(null);
                navigate('/login');
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Error during logout: ', error);
        }
    };

    const checkAuth = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/AccountAPI/checkAuth`, { withCredentials: true });

            if (response.status === 200) {
                const userData: User = response.data;
                setUser(userData);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error('Error checking auth status:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const checkAuthentication = async () => {
            await checkAuth();
        };

        checkAuthentication();
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {loading ? <p>Loading...</p> : children}
        </AuthContext.Provider>
    );
};
