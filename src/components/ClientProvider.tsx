"use client";

import { usePathname } from "next/navigation";
import { Provider } from "react-redux";
import store from "@/redux/store"; // 🔥 Đảm bảo file này tồn tại và đúng alias
import LayoutAdmin from "@/components/Layout";
import ToastContainer from "@/components/ToastContainer";
import { ThemeProvider } from "@/components/theme-provider";
import ProtectedLayout from "@/components/ProtectedLayout";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAdmin = true;

  return (
    <Provider store={store}>
      {" "}
      {/* 🔥 Bọc toàn bộ ứng dụng trong Redux Provider */}
      <ThemeProvider
        enableSystem
        attribute="class"
        defaultTheme="system"
        disableTransitionOnChange
      >
        {isAdmin ? (
          <ProtectedLayout>
            <LayoutAdmin>
              <main>{children}</main>
            </LayoutAdmin>
          </ProtectedLayout>
        ) : (
          <main>{children}</main>
        )}
        <ToastContainer />
      </ThemeProvider>
    </Provider>
  );
}
