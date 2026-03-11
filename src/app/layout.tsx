import type { Metadata } from "next";
import { Raleway } from "next/font/google"; // Raleway ইম্পোর্ট করুন
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";
import AuthProvider from "@/contexts/AuthProvider";
import RouteProxy from "@/components/shared/RouteProxy";
const raleway = Raleway({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-raleway", 
});

export const metadata: Metadata = {
  title: "Seoul Mirage | Luxury Skincare",
  description: "Experience the ultimate luxury in skincare with Seoul Mirage.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${raleway.variable} font-raleway antialiased`}
      >
        <AuthProvider>
          <RouteProxy>

          <CartProvider>
            {children}
          </CartProvider>
          </RouteProxy>
        </AuthProvider>
      </body>
    </html>
  );
}