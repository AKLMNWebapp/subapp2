import API_URL from "../apiConfig";
import { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContextType, User } from "types/auth";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User| null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    const login = async (email: string, password: string): Promise<boolean> => {
        try {
            const response = await fetch(`${API_URL}/api/AccountAPI/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password}),
                credentials: 'include'
            });

            if (response.ok) {
                const userData = await response.json();
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
            const response = await fetch(`${API_URL}/api/AccountAPI/logout`, {
                method: 'POST',
                credentials: 'include'
            });

            if (response.ok) {
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
            const response = await fetch(`${API_URL}/api/AccountAPI/checkAuth`, {
                credentials: 'include'
            });

            if (response.ok) {
                const userData: User = await response.json();
                setUser(userData);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error('Error cheching auth status:', error);
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

    )


}
