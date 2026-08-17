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
          <a href="https://www.linkedin.com/in/abhigyan-satya-das-4903a5260/" target="_blank" rel="noopener noreferrer" className={styles.link}>
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  )
}
