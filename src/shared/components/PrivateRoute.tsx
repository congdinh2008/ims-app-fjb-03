import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/auth.context";

interface PrivateRouteProps {
    requiredRoles?: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ requiredRoles }) => {
    const { isAuthenticated, userInformation } = useAuth();
    const roles = userInformation?.roles || [];
    const location = useLocation();

    const hasRequiredRole = requiredRoles ? requiredRoles.some(role => roles.includes(role)) : true;

    if (!isAuthenticated) {
        return <Navigate to="/auth/login" state={{ from: location }} />;
    }

    if (!hasRequiredRole) {
        return <Navigate to="/no-permission" />;
    }

    return <Outlet />;
}

export default PrivateRoute;