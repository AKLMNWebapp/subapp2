export interface User {
    UserId: string;
    Email: string;
    Role: string; // You can adjust this based on your role setup
}

export interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;
    loading: boolean;
}
