import { useQuery } from "@tanstack/react-query";
import { getQueryFn } from "@/lib/queryClient";
import AdminLogin from "@/pages/admin-login";

export interface AdminUser {
  id: string;
  username: string;
  role: string;
}

export function useAdminUser() {
  return useQuery<AdminUser | null>({
    queryKey: ["/api/auth/me"],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });
}

// Hides admin screens until the server confirms the login. The API enforces this too.
export function AdminGate({ children }: { children: React.ReactNode }) {
  const { data: user, isLoading } = useAdminUser();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Checking login...</div>;
  }
  return user ? <>{children}</> : <AdminLogin />;
}
