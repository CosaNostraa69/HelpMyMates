import "./globals.css";
import Navbar from "./Navbar";
import Footer from "./components/Footer";
import { ThemeProvider } from "next-themes";

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
        <ThemeProvider attribute="class">
          <Navbar isAuthenticated={false} user={undefined} />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}