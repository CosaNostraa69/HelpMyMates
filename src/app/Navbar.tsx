import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from 'next/link';
import styles from './Navbar.module.css';

export default async function Navbar() {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <nav className={styles.container}>
      <Link href="/" className={styles.logo}>
        HelpMyMates
      </Link>
      <div className={styles.navLinks}>
      <Link href="/" className={styles.navLink}>Home</Link>
        <Link href="/games" className={styles.navLink}>Games</Link>
        <Link href="/topics" className={styles.navLink}>Topics</Link>
        <Link href="/about" className={styles.navLink}>About</Link>
        {!(await isAuthenticated()) ? (
          <>
            <LoginLink className={styles.navLink} postLoginRedirectURL="/">
              Sign in
            </LoginLink>
            <RegisterLink className={`${styles.navLink} ${styles.signUpBtn}`} postLoginRedirectURL="/">
              Sign up
            </RegisterLink>
          </>
        ) : (
          <div className={styles.profileBlob}>
            {user?.picture ? (
              <img className={styles.avatar} src={user.picture} alt="User Avatar" referrerPolicy="no-referrer" />
            ) : (
              <div className={styles.avatar}>
                {user?.given_name?.[0]}
                {user?.family_name?.[0]}
              </div>
            )}
            <div>
              <p className={styles.textHeading2}>
                {user?.given_name} {user?.family_name}
              </p>
              <LogoutLink className={styles.textSubtle}>Log out</LogoutLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}