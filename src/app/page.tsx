import React from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default function HomePage() {
  return (
    <div className={styles.container}>


      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h2 className={styles.heroTitle}>Connect, Share, and Support</h2>
            <p className={styles.heroDescription}>
              HelpMyMates is your go-to platform to connect with friends, share experiences, and support each other through life challenges.
            </p>
            <div className={styles.heroActions}>
              <Link href="/signup" className={styles.btnPrimary}>Sign Up</Link>
              <Link href="/login" className={styles.btnSecondary}>Log In</Link>
            </div>
          </div>
          <div className={styles.heroImage}>
            <img src="/images/hero-illustration.svg" alt="HelpMyMates Illustration" />
          </div>
        </section>

        <section className={styles.features}>
          <h2 className={styles.sectionTitle}>Key Features</h2>
          <div className={styles.featureGrid}>
            <div className={styles.featureItem}>
              <img src="/images/chat-icon.svg" alt="Chat Icon" className={styles.featureIcon} />
              <h3 className={styles.featureTitle}>Instant Messaging</h3>
              <p className={styles.featureDescription}>
                Stay connected with your mates through real-time messaging and group chats.
              </p>
            </div>
            <div className={styles.featureItem}>
              <img src="/images/support-icon.svg" alt="Support Icon" className={styles.featureIcon} />
              <h3 className={styles.featureTitle}>Vent and Support</h3>
              <p className={styles.featureDescription}>
                Share your thoughts, feelings, and experiences in a safe and supportive environment.
              </p>
            </div>
            <div className={styles.featureItem}>
              <img src="/images/resources-icon.svg" alt="Resources Icon" className={styles.featureIcon} />
              <h3 className={styles.featureTitle}>Helpful Resources</h3>
              <p className={styles.featureDescription}>
                Access a curated collection of articles, tips, and resources to support your well-being.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.cta}>
          <h2 className={styles.ctaTitle}>Ready to Connect with Your Mates?</h2>
          <p className={styles.ctaDescription}>
            Join HelpMyMates today and start building meaningful connections and support networks.
          </p>
          <Link href="/signup" className={styles.ctaButton}>Get Started</Link>
        </section>
      </main>

   
    </div>
  );
}