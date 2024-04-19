// ./components/Footer.tsx
import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <strong className={styles.logo}>HelpMyMates</strong>
        <p className={styles.tagline}>Connect with your friends and family</p>
        <div className={styles.links}>
          <Link href="/about" className={styles.link}>About</Link>
          <Link href="/company" className={styles.link}>Company</Link>
          <Link href="/blog" className={styles.link}>Blog</Link>
          <Link href="/support" className={styles.link}>Support</Link>
        </div>
        <div className={styles.social}>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
        <div className={styles.newsletter}>
          <input type="email" placeholder="Your email" className={styles.newsletterInput} />
          <button className={styles.newsletterButton}>Subscribe</button>
        </div>
        <small className={styles.copyright}>
          © 2024 HelpMyMates, Inc. All rights reserved
        </small>
      </div>
    </footer>
  );
}

export default Footer;