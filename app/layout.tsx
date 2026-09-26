import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "La Casa Tutu | Tienda Online en Creación",
  description: "Tienda oficial de La Casa Tutu en proceso de creación. Catálogo y compras próximamente.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
