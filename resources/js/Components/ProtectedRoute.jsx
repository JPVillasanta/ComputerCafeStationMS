import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const isAuthenticated =
        localStorage.getItem("cafe_authenticated") === "true";

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
}
