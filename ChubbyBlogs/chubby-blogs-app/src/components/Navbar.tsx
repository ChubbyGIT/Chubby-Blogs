'use client'

import { useState } from 'react'
import Link from 'next/link'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        {/* Wordmark */}
        <Link href="/" className={styles.wordmark}>
          Chubby Blogs
        </Link>

        {/* Desktop nav links */}
        <div className={styles.desktopNav}>
          <Link href="/#posts" className={styles.navLink}>Archive</Link>
          <Link href="/#about" className={styles.navLink}>About</Link>
          <a href="mailto:hello@chubbyblogs.com" className={styles.navLink}>Contact</a>
          {/* RSS icon */}
          <a href="/rss" aria-label="RSS feed" className={`${styles.navLink} ${styles.rssLink}`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19.01 7.38 20 6.18 20C4.98 20 4 19.01 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1z" />
            </svg>
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          <Link href="/#posts" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>Archive</Link>
          <Link href="/#about" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>About</Link>
          <a href="mailto:hello@chubbyblogs.com" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>Contact</a>
        </div>
      )}
    </header>
  )
}
