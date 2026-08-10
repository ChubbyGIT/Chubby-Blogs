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
          <Link href="/#about" className={styles.navLink}>About</Link>
          <Link href="/#contact" className={styles.navLink}>Contact</Link>
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
          <Link href="/#about" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>About</Link>
          <Link href="/#contact" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>Contact</Link>
        </div>
      )}
    </header>
  )
}
