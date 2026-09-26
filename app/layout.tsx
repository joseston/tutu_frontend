import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "La Casa Tutu | Página en proceso de creación",
  description: "El sitio web de La Casa Tutu está en proceso de creación. Muy pronto disponible.",
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
