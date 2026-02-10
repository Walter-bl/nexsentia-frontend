import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";
import AclGuard from "@/components/widgets/AclGuard";





export const metadata: Metadata = {
  title: "Nex-Sentia",
  description: "A project management tool",
  icons: {
    icon: '/logo.png',
    shortcut: '/shortcut-button.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={` antialiased`}
      >
       <AuthProvider>
        
             <AclGuard requiredPermissions={["reports.read"]}>{children}</AclGuard>
        

            <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: "#0F2828",
                color: "#EFF2FE",
                border: "1px solid #469F88CC",
                padding: "12px 16px",
                borderRadius: "12px",
              },
            }}
          />
       </AuthProvider>
      </body>
    </html>
  );
}
