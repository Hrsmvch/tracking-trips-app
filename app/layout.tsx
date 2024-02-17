import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tracking trips",
  description: "Personal tracking trips.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
