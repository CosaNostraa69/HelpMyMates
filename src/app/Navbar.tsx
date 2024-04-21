"use client";
import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Link from 'next/link';
import styles from './Navbar.module.css';
import { Button } from "./components/ButtonToogle";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

export default function Navbar({ isAuthenticated, user }: { isAuthenticated: boolean, user: any }) {
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
        {!isAuthenticated ? (
          <>
            <LoginLink className={styles.navLink} postLoginRedirectURL="/">
              Sign in
            </LoginLink>
            <RegisterLink className={`${styles.navLink} ${styles.signUpBtn}`} postLoginRedirectURL="/">
              Sign up
            </RegisterLink>
          </>
        ) : (
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <div className={styles.profileBlob}>
                {user?.picture ? (
                  <img className={styles.avatar} src={user.picture} alt="User Avatar" referrerPolicy="no-referrer" />
                ) : (
                  <div className={styles.avatar}>
                    {user?.given_name?.[0]}
                    {user?.family_name?.[0]}
                  </div>
                )}
              </div>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content className={styles.dropdownContent} sideOffset={5}>
                <DropdownMenu.Item className={styles.dropdownItem}>
                  <p className={styles.textHeading2}>
                    {user?.given_name} {user?.family_name}
                  </p>
                </DropdownMenu.Item>
                <DropdownMenu.Separator className={styles.separator} />
                <DropdownMenu.Item className={styles.dropdownItem}>
                  <Link href="/profile" className={styles.profileLink}>
                    <i className={`${styles.icon} fas fa-user`}></i>
                    My Profile
                  </Link>
                </DropdownMenu.Item>
                <DropdownMenu.Item className={styles.dropdownItem}>
                  <LogoutLink className={styles.logoutLink}>
                    <i className={`${styles.icon} ${styles.logoutIcon} fas fa-sign-out-alt`}></i>
                    Log out
                  </LogoutLink>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        )}
        <Button />
      </div>
    </nav>
  );
}