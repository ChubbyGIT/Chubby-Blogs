import Link from 'next/link'
import styles from './Footer.module.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={`${styles.inner} container`}>
        {/* Left: copyright */}
        <div className={styles.copy}>
          © {year} Chubby Blogs. All rights reserved.
        </div>

        {/* Right: links */}
        <div className={styles.links}>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.link}>
            Twitter
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.link}>
            Instagram
          </a>
          <span className={styles.divider} />
          <Link href="/privacy" className={`${styles.link} ${styles.mutedLink}`}>
            Privacy
          </Link>
          <Link href="/terms" className={`${styles.link} ${styles.mutedLink}`}>
            Terms
          </Link>
        </div>
      </div>
    </footer>
  )
}
