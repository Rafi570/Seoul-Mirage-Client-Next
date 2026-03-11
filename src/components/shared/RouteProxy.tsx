"use client";

import { useContext, useEffect, useState, ReactNode } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import useAxios from "@/hooks/useAxios";
import { RoleResponse } from "@/types";

interface RouteProxyProps {
  children: ReactNode;
}

const RouteProxy = ({ children }: RouteProxyProps) => {
  const auth = useContext(AuthContext);
  const user = auth?.user;
  const authLoading = auth?.loading;
  
  const axios = useAxios();
  const router = useRouter();
  const pathname = usePathname();
  
  const [authorized, setAuthorized] = useState<boolean>(false);
  const [checkingRole, setCheckingRole] = useState<boolean>(true);

  const privateRoutes: string[] = ["/my-profile", "/orders", "/settings", "/process-pay"];
  const adminRoutes: string[] = ["/dashboard", "/admin"];

  useEffect(() => {
    const checkAccess = async () => {
      if (authLoading) return;

      const isPrivate = privateRoutes.some(route => pathname.startsWith(route));
      const isAdmin = adminRoutes.some(route => pathname.startsWith(route));

      if ((isPrivate || isAdmin) && !user) {
        router.push("/login");
        return;
      }

      if (isAdmin && user) {
        try {
          const res = await axios.get<RoleResponse>(`/api/auth/role?email=${user.email}`);
          if (res.data.success && res.data.role === "admin") {
            setAuthorized(true);
          } else {
            router.push("/");
          }
        } catch (err) {
          router.push("/");
        } finally {
          setCheckingRole(false);
        }
      } 
      else {
        setAuthorized(true);
        setCheckingRole(false);
      }
    };
    checkAccess();
  }, [pathname, user, authLoading, axios, router]);

  if (authLoading || (pathname.includes('admin') && checkingRole)) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#FDFBF9] font-black uppercase tracking-widest text-gray-400 animate-pulse font-raleway">
        Verifying Access...
      </div>
    );
  }

  return authorized ? <>{children}</> : null;
};

export default RouteProxy;