"use client";

import { useContext, useEffect, useState, ReactNode } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import useAxios from "@/hooks/useAxios";
import Swal from "sweetalert2"; // Error message dekhate use korte paren

interface RouteProxyProps {
  children: ReactNode;
}

const RouteProxy = ({ children }: RouteProxyProps) => {
  const auth = useContext(AuthContext);
  const user = auth?.user;
  const logout = auth?.logout;
  const authLoading = auth?.loading;
  
  const axios = useAxios();
  const router = useRouter();
  const pathname = usePathname();
  
  const [authorized, setAuthorized] = useState<boolean>(false);
  const [checkingRole, setCheckingRole] = useState<boolean>(true);

  const adminRoutes: string[] = ["/dashboard", "/admin"];

  useEffect(() => {
    const checkAccess = async () => {
      if (authLoading) return;

      const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));

      // ১. Admin route-e jodi user thake kintu se login kora na thake
      if (isAdminRoute && !user) {
        router.push("/login");
        return;
      }

      // ২. Admin route-e jodi user thake, tokhon role check hobe
      if (isAdminRoute && user) {
        try {
          const res = await axios.get(`/api/auth/role?email=${user.email}`);
          
          if (res.data.success && res.data.role === "admin") {
            setAuthorized(true);
          } else {
            // --- LOGOUT LOGIC START ---
            if (logout) {
              await logout(); // User admin na hole logout kore dibe
            }
            router.push("/login");
            Swal.fire({
              title: "Access Denied",
              text: "Admin access only! You have been logged out.",
              icon: "error",
              confirmButtonColor: "#000"
            });
            // --- LOGOUT LOGIC END ---
          }
        } catch (err) {
          if (logout) await logout();
          router.push("/login");
        } finally {
          setCheckingRole(false);
        }
      } 
      else {
        // Public ba onno route hole access allowed
        setAuthorized(true);
        setCheckingRole(false);
      }
    };

    checkAccess();
  }, [pathname, user, authLoading, logout, axios, router]);

  if (authLoading || (adminRoutes.some(r => pathname.startsWith(r)) && checkingRole)) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#FDFBF9] font-black uppercase tracking-widest text-gray-400 animate-pulse font-raleway">
        Verifying Security...
      </div>
    );
  }

  return authorized ? <>{children}</> : null;
};

export default RouteProxy;