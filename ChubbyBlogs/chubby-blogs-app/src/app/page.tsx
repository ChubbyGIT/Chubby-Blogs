import { getAllPosts } from '@/lib/posts'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PostCard from '@/components/PostCard'
import styles from './Home.module.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Chubby Blogs | Abhigyan',
  description:
    'Notes on AI, product, and music — as I build things. Personal blog by Abhigyan.',
}

export default function HomePage() {
  const posts = getAllPosts()

  return (
    <>
      <Navbar />

      <main>
        {/* ── Hero ────────────────────────────────────────── */}
        <section className={`${styles.heroSection} container`}>
          <h1 className={styles.heroTitle}>Chubby&nbsp;Blogs</h1>
          <p className={styles.heroTagline}>
            Notes on AI, product, and music — as I build things.
          </p>
        </section>

        {/* ── Post Grid ───────────────────────────────────── */}
        <section id="posts" className={`${styles.gridSection} container`}>
          <div className={styles.grid}>
            {posts.map((post, i) => (
              <PostCard key={post.slug} post={post} index={i} />
            ))}

            {/* Placeholder slots when fewer than 3 posts */}
            {posts.length < 3 && (
              <div className={`${styles.placeholderCard} ${styles.placeholderDark}`}>
                <div className={styles.placeholderInner}>
                  <span className={styles.placeholderIcon}>+</span>
                  <p className={styles.placeholderText}>New Draft Incoming</p>
                </div>
              </div>
            )}

            {posts.length < 2 && (
              <div className={`${styles.placeholderCard} ${styles.placeholderDarker}`}>
                <div className={styles.placeholderInner}>
                  <span className={styles.placeholderIcon}>⌛</span>
                  <p className={styles.placeholderText}>Expansion in Progress</p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ── Divider ─────────────────────────────────────── */}
        <div className="container">
          <hr className={styles.divider} />
        </div>

        {/* ── About ───────────────────────────────────────── */}
        <section id="about" className={`${styles.aboutSection} container`}>
          <div className={styles.aboutGrid}>
            <div className={styles.aboutText}>
              <p className={styles.aboutLabel}>The Author</p>
              <p className={styles.aboutBody}>
                I&apos;m{' '}
                <span className={styles.highlight}>Abhigyan</span>{' '}
                — a product manager working on enterprise low-code platforms, with a running interest in how AI is reshaping the build cycle. I also make music as{' '}
                <span className={styles.highlight}>ChubbyRiffs</span>. This is where I write about both.
              </p>
            </div>

            <div className={styles.aboutCta}>
              <a href="/#about" className={styles.ctaButton}>
                About the Author
              </a>
            </div>
          </div>
        </section>

        {/* ── Divider ─────────────────────────────────────── */}
        <div className="container">
          <hr className={styles.divider} />
        </div>

        {/* ── Contact ──────────────────────────────────────── */}
        <section id="contact" className={`${styles.aboutSection} container`}>
          <div className={styles.aboutGrid}>
            <div className={styles.aboutText}>
              <p className={styles.aboutLabel}>Get in Touch</p>
              <p className={styles.aboutBody}>
                <span className={styles.highlight}>Abhigyan Das</span>
              </p>
              <p className={styles.aboutBody} style={{ marginTop: '0.5rem' }}>
                📧 <a href="mailto:abhigyansdas1234@gmail.com" style={{ color: 'inherit' }}>abhigyansdas1234@gmail.com</a>
              </p>
              <p className={styles.aboutBody}>
                📞 <a href="tel:9880987891" style={{ color: 'inherit' }}>9880987891</a>
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
