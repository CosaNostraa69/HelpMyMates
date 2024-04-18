import "./globals.css";
import Link from "next/link";
import Navbar from "./Navbar";
import Footer from "./components/Footer";

export const metadata = {
  title: "Help my Mates",
  description: "Connect with your friends and family",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
