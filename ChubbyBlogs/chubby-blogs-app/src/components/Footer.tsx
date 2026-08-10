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
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.link}>
            Instagram
          </a>
        </div>
      </div>
    </footer>
  )
}
