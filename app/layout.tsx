import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar/NavBar";
import { AuthContextProvider } from "@/context/AuthContext";
import { TripsContextProvider } from "@/context/TripsContext";

export const metadata: Metadata = {
  title: "Tracking Trips",
  description: "Personal tracking trips app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>
          <TripsContextProvider>
            <NavBar />
            {children}
          </TripsContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
