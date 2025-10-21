import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./context/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Sabor a Hogar",
  description: "Somos Marian y Sofía, Dos amigas que decidieron emprender juntas con una idea simple: compartir amor en forma de cositas dulces.En Sabor a Hogar hacemos cada receta con dedicación, buscando que cada bocado te transporte a esos momentos caseros que tanto se disfrutan.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
