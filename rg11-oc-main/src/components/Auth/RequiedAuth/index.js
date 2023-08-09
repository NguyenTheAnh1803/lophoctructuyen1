import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '~/components/Auth';

function RequireAuth({ children }) {
    const location = useLocation();
    const auth = useAuth();

    const userToken = auth.getTokens();

    if (!auth.user && userToken === null) {
        return <Navigate to="/login" state={{ path: location.pathname }} />;
    }
    return children;
}

export default RequireAuth;
