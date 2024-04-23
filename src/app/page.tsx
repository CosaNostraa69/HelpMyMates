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
              <Link href="/topics" className={styles.btnPrimary}>Discover Our Topics</Link>
            </div>
          </div>
          <div className={styles.heroImage}>
            <img src="/images/hero-illustration.jpg" alt="HelpMyMates Illustration" />
          </div>
        </section>

        <section className={styles.features}>
          <h2 className={styles.sectionTitle}>Key Features</h2>
          <div className={styles.featureGrid}>
            <div className={styles.featureItem}>
              <img src="https://img.icons8.com/cotton/64/000000/chat.png" alt="Chat Icon" className={styles.featureIcon} />
              <h3 className={styles.featureTitle}>Instant Messaging</h3>
              <p className={styles.featureDescription}>
                Stay connected with your mates through real-time messaging and group chats.
              </p>
            </div>
            <div className={styles.featureItem}>
              <img src="https://img.icons8.com/arcade/64/000000/customer-support.png" alt="Support Icon" className={styles.featureIcon} />
              <h3 className={styles.featureTitle}>Vent and Support</h3>
              <p className={styles.featureDescription}>
                Share your thoughts, feelings, and experiences in a safe and supportive environment.
              </p>
            </div>
            <div className={styles.featureItem}>
              <img src="https://img.icons8.com/color/48/000000/resources.png" alt="Resources Icon" className={styles.featureIcon} />
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