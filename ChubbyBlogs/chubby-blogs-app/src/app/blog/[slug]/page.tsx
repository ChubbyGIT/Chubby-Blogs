import { getPostBySlug, getAllPosts } from '@/lib/posts'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ReadingProgress from '@/components/ReadingProgress'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import styles from './BlogPost.module.css'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return { title: 'Post Not Found' }

  return {
    title: `${post.title} | Chubby Blogs`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : [],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  return (
    <>
      <ReadingProgress />
      <Navbar />

      <main className={styles.main}>
        {/* Back link — top */}
        <div className={styles.backWrapper}>
          <Link href="/" className={styles.backLink}>
            ← back to all posts
          </Link>
        </div>

        <article className={styles.article}>
          {/* Article header */}
          <header className={styles.header}>
            <h1 className={styles.title}>{post.title}</h1>
            <div className={styles.meta}>
              <span>{post.date}</span>
              {post.readTime && (
                <>
                  <span className={styles.dot}>•</span>
                  <span>{post.readTime}</span>
                </>
              )}
            </div>
          </header>

          {/* Cover image */}
          {post.coverImage && (
            <figure className={styles.figure}>
              <div className={styles.imageWrapper}>
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 720px"
                  style={{ objectFit: 'cover' }}
                  unoptimized={post.coverImage.endsWith('.gif')}
                  priority
                />
              </div>
              <figcaption className={styles.figcaption}>
                {post.excerpt}
              </figcaption>
            </figure>
          )}

          {/* Post body */}
          <section className={`prose ${styles.proseSection}`}>
            <MDXRemote source={post.content} />
          </section>

          {/* Bottom divider */}
          <hr className={styles.hr} />

          {/* Back link — bottom */}
          <div className={styles.backWrapper}>
            <Link href="/" className={styles.backLink}>
              ← back to all posts
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </>
  )
}
