'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import type { PostMeta } from '@/lib/posts'
import styles from './PostCard.module.css'

interface PostCardProps {
  post: PostMeta
  index?: number
}

export default function PostCard({ post, index = 0 }: PostCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Link href={`/blog/${post.slug}`} className={styles.cardLink}>
        <div className={styles.card}>
          {/* Cover media — prefer MP4 video over GIF/image */}
          {post.coverVideo ? (
            <div className={styles.imageWrapper}>
              <video
                className={styles.video}
                src={post.coverVideo}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                aria-hidden="true"
              />
              <div className={styles.overlay} />
            </div>
          ) : post.coverImage ? (
            <div className={styles.imageWrapper}>
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className={styles.image}
                sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw"
                unoptimized={post.coverImage.endsWith('.gif')}
              />
              {/* Gradient overlay */}
              <div className={styles.overlay} />
            </div>
          ) : (
            <div className={styles.placeholder} />
          )}

          {/* Card text */}
          <div className={styles.content}>
            {post.category && (
              <span className={styles.category}>{post.category}</span>
            )}
            <h3 className={styles.title}>{post.title}</h3>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
