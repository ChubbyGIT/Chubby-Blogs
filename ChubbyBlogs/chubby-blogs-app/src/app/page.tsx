import { getAllPosts } from '@/lib/posts'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PostCard from '@/components/PostCard'
import styles from './Home.module.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Chubby Blogs | Abhigyan',
  description:
    'A collection of things worth thinking about. Personal blog by Abhigyan.',
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
            A collection of things worth thinking about.
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
                I&apos;m <span className={styles.highlight}>Abhigyan</span>. I&apos;m an artist, and <span className={styles.highlight}>Chubby Blogs</span> is where I collect the things that make me stop and think.
              </p>
              <p className={styles.aboutBody}>
                This isn&apos;t a blog about one particular field, industry, or obsession. It&apos;s a place for ideas worth following.
              </p>
              <p className={styles.aboutBody}>
                Technology, science, design, music, culture, products, strange experiments, new ways of working, things being built, things being broken, and the occasional rabbit hole that turns out to be far more interesting than expected.
              </p>
              <p className={styles.aboutBody}>
                The internet produces something new every day. Most of it disappears into the noise. This is my attempt to catch a few things before they do.
              </p>
              <p className={styles.aboutBody}>
                I write about things I find interesting, things I&apos;m learning, things I want to understand better, and ideas that make me look at the world a little differently.
              </p>
              <p className={styles.aboutBody}>
                <span className={styles.highlight}>Chubby Blogs</span> is essentially a collection of curiosities. No particular niche. No grand thesis. Just interesting things, explored properly.
              </p>
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
                <a href="https://www.linkedin.com/in/abhigyan-satya-das-4903a5260/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>LinkedIn</a>
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
