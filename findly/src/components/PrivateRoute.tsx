import React, {useContext} from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { AuthContextType } from 'types/auth';


interface PrivateRouteProps {
    children: React.ReactNode;
    roles?: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({children, roles}) => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("PrivateRoute must be withing AuthProvider")
    }

    const { user } = context;

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (roles && !roles.includes(user.Role)) {
        return <Navigate to="/unathorized" />;
    }

    return <>{children}</>;
}

export default PrivateRoute;