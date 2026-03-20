import { Navigate } from "react-router-dom";
import { useAuth, UserRole } from "@/lib/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  roles?: UserRole[];
}

const ProtectedRoute = ({ children, roles }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, hasRole } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated) return <Navigate to="/auth/login" replace />;
  if (roles && !hasRole(roles)) return <Navigate to="/" replace />;

  return <>{children}</>;
};

export default ProtectedRoute;
