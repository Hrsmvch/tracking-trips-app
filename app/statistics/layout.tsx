import type { Metadata } from "next";
import { AuthContextProvider } from "@/context/AuthContext";
import Navigation from "@/components/Navigation/Navigation";
import PageContainer from "@/components/Containers/PageContainer";
import { TripsContextProvider } from "@/context/TripContext";
import StatisticsContainer from "@/components/Containers/StatisticsContainer";

export const metadata: Metadata = {
  title: "Tracking trips | Analytics",
  description: "Personal tracking trips.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <AuthContextProvider>
      <Navigation />
      <TripsContextProvider>
        <StatisticsContainer>
         {children}
        </StatisticsContainer>
      </TripsContextProvider>
    </AuthContextProvider>
  </>
  );
}
