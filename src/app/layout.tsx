// layout.tsx
import "./globals.css";
import NavbarWrapper from "./components/NavbarWrapper";
import Footer from "./components/Footer";
import { ThemeProvider } from "next-themes";


<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
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
          <NavbarWrapper />
          <main style={{ paddingBottom: "6rem" }}>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}