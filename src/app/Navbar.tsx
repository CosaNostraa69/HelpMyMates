"use client";
import Link from 'next/link';
import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import styles from './Navbar.module.css';
import { useState } from 'react';
import { Button } from './components/ButtonToogle';

export default function Navbar({ isAuthenticated, user }: { isAuthenticated: boolean, user: any }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);  // État pour gérer l'affichage du menu mobile

  return (
    <nav className={styles.container}>
      <div className={styles.leftSection}>  
        <div className={styles.logoSection}>
          <Link href="/" className={styles.logo}>
            HelpMyMates
          </Link>
          <div className={styles.verticalLine}></div>
        </div>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={styles.menuToggle}>☰</button>
        <div className={`${styles.navLinks} ${isMenuOpen ? styles.showMenu : ''}`}>
          <Link href="/" className={styles.navLink}>Home</Link>
          <Link href="/games" className={styles.navLink}>Games</Link>
          <Link href="/topics" className={styles.navLink}>Topics</Link>
          <Link href="/about" className={styles.navLink}>About</Link>
        </div>
      </div>
      <div className={styles.rightSection}>
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
                {user?.pictureUrl ? (
                  <img className={styles.avatar} src={user.pictureUrl} alt="User Avatar" referrerPolicy="no-referrer" />
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
                  {user?.given_name} {user?.family_name}
                </DropdownMenu.Item>
                <DropdownMenu.Separator className={styles.separator} />
                <DropdownMenu.Item className={styles.dropdownItem}>
                  <Link href="/profile" className={styles.profileLink}>
                    My Profile
                  </Link>
                </DropdownMenu.Item>
                <DropdownMenu.Item className={styles.dropdownItem}>
                  <LogoutLink className={styles.logoutLink}>
                    Log out
                  </LogoutLink>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        )}
        < Button />
      </div>
    </nav>
  );
}
