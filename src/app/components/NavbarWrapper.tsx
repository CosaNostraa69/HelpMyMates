// NavbarWrapper.tsx
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Navbar from "../Navbar";

export default async function NavbarWrapper() {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = await getUser();

  return <Navbar isAuthenticated={await isAuthenticated()} user={user} />;
}