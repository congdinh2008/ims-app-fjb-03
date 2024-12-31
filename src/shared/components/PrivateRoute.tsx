import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/auth.context";

const PrivateRoute: React.FC<any> = () => {
    const { isAuthenticated, userInformation } = useAuth();
    const roles = userInformation?.roles;

    const location = useLocation();

    return isAuthenticated ? (
        roles.includes('Admin') ? <Outlet /> : <Navigate to="/no-permission" />
    ) : (
        <Navigate to="/auth/login" state={{ from: location }} />
    );
}

export default PrivateRoute;