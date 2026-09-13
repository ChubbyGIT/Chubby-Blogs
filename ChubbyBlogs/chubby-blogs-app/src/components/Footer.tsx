import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.inner} container`}>
        <p className={styles.copy}>
          © 2026 ChubbyBlogs, all rights reserved.
        </p>
      </div>
    </footer>
  )
}
