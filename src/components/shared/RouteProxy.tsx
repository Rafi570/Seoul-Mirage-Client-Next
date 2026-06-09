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

  // রুট লিস্ট
  const privateRoutes = ["/my-profile", "/orders", "/settings", "/process-pay"];
  const adminRoutes = ["/dashboard", "/admin"];

  useEffect(() => {
    const checkAccess = async () => {
      // ১. অথেন্টিকশন লোড হওয়া পর্যন্ত অপেক্ষা করুন
      if (authLoading) return;

      const isPrivate = privateRoutes.some(route => pathname.startsWith(route));
      const isAdmin = adminRoutes.some(route => pathname.startsWith(route));

      // ২. লগইন ছাড়া প্রাইভেট বা অ্যাডমিন রুটে ঢোকা নিষেধ
      if ((isPrivate || isAdmin) && !user) {
        setAuthorized(false);
        router.push("/login");
        return;
      }

      // ৩. অ্যাডমিন রুট ভেরিফিকেশন
      if (isAdmin && user) {
        setCheckingRole(true);
        try {
          // ইমেইল চেক করার আগে ইউজার ইমেইল আছে কি না নিশ্চিত হোন
          if (!user.email) throw new Error("No email found");
          
          const res = await axios.get<RoleResponse>(`/api/auth/role?email=${user.email}`);
          
          if (res.data.success && res.data.role === "admin") {
            setAuthorized(true);
          } else {
            setAuthorized(false);
            router.push("/");
          }
        } catch (err) {
          console.error("Role Check Error:", err);
          setAuthorized(false);
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
  }, [pathname, user, authLoading]); 

  if (authLoading || (adminRoutes.some(r => pathname.startsWith(r)) && checkingRole)) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#FDFBF9] font-black uppercase tracking-widest text-gray-400 animate-pulse font-raleway">
        Verifying Access...
      </div>
    );
  }

  return authorized ? <>{children}</> : null;
};

export default RouteProxy;