import React from "react";
import "./globals.css";

export const metadata = {
  title: "Information Pays",
  description: "Rechercher des informations sur un pays via SOAP",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
