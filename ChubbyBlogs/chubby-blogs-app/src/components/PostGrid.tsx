'use client'

import { useState, useMemo } from 'react'
import PostCard from './PostCard'
import type { PostMeta } from '@/lib/posts'
import styles from './PostGrid.module.css'

interface PostGridProps {
  posts: PostMeta[]
}

const POSTS_PER_PAGE = 3

type SortOrder = 'latest' | 'earliest'

export default function PostGrid({ posts }: PostGridProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [sortOrder, setSortOrder] = useState<SortOrder>('latest')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)

  // Fuzzy search: score each post based on how closely it matches the query
  const fuzzyMatch = (text: string, query: string): number => {
    if (!query) return 1
    const t = text.toLowerCase()
    const q = query.toLowerCase()
    if (t.includes(q)) return 2 // exact substring match → highest score

    // Fuzzy: check if all chars of query appear in sequence in text
    let qi = 0
    let score = 0
    for (let ti = 0; ti < t.length && qi < q.length; ti++) {
      if (t[ti] === q[qi]) {
        score += 1
        qi++
      }
    }
    return qi === q.length ? score / t.length : 0
  }

  // Filtered + sorted posts
  const filteredPosts = useMemo(() => {
    let result = [...posts]

    // Sort
    result.sort((a, b) => {
      const da = new Date(a.date).getTime()
      const db = new Date(b.date).getTime()
      return sortOrder === 'latest' ? db - da : da - db
    })

    // Fuzzy filter
    if (searchQuery.trim()) {
      result = result
        .map((post) => {
          const textToSearch = `${post.title} ${post.excerpt} ${post.category}`
          const score = fuzzyMatch(textToSearch, searchQuery.trim())
          return { post, score }
        })
        .filter(({ score }) => score > 0)
        .sort((a, b) => b.score - a.score)
        .map(({ post }) => post)
    }

    return result
  }, [posts, sortOrder, searchQuery])

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE))

  // Reset to page 1 when filter/search changes
  const handleSort = (order: SortOrder) => {
    setSortOrder(order)
    setCurrentPage(1)
  }

  const handleSearch = (q: string) => {
    setSearchQuery(q)
    setCurrentPage(1)
  }

  const pagedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  )

  return (
    <section id="posts" className={styles.section}>
      {/* ── Controls bar ─────────────────────────────── */}
      <div className={styles.controls}>
        {/* Sort buttons */}
        <div className={styles.sortGroup}>
          <button
            id="btn-sort-latest"
            className={`${styles.sortBtn} ${sortOrder === 'latest' ? styles.sortBtnActive : ''}`}
            onClick={() => handleSort('latest')}
            aria-pressed={sortOrder === 'latest'}
          >
            <span className={styles.sortIcon}>↓</span>
            Latest First
          </button>
          <button
            id="btn-sort-earliest"
            className={`${styles.sortBtn} ${sortOrder === 'earliest' ? styles.sortBtnActive : ''}`}
            onClick={() => handleSort('earliest')}
            aria-pressed={sortOrder === 'earliest'}
          >
            <span className={styles.sortIcon}>↑</span>
            Earliest First
          </button>
        </div>

        {/* Search bar */}
        <div className={styles.searchWrapper}>
          <button
            id="btn-search-toggle"
            className={`${styles.searchToggle} ${searchOpen || searchQuery ? styles.searchToggleActive : ''}`}
            onClick={() => setSearchOpen((v) => !v)}
            aria-label="Toggle search"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            Search
          </button>
          <div className={`${styles.searchField} ${searchOpen ? styles.searchFieldOpen : ''}`}>
            <input
              id="input-search"
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className={styles.searchInput}
              autoFocus={searchOpen}
            />
            {searchQuery && (
              <button
                className={styles.searchClear}
                onClick={() => handleSearch('')}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Search results hint ────────────────────────── */}
      {searchQuery && (
        <p className={styles.searchHint}>
          {filteredPosts.length === 0
            ? 'No posts matched your search.'
            : `${filteredPosts.length} post${filteredPosts.length !== 1 ? 's' : ''} found`}
        </p>
      )}

      {/* ── Post grid ────────────────────────────────── */}
      <div className={styles.grid}>
        {pagedPosts.map((post, i) => (
          <PostCard key={post.slug} post={post} index={i} />
        ))}

        {/* Placeholder slots when fewer than 3 posts on this page */}
        {pagedPosts.length < 1 && !searchQuery && (
          <div className={`${styles.placeholderCard} ${styles.placeholderDarker}`}>
            <div className={styles.placeholderInner}>
              <span className={styles.placeholderIcon}>⌛</span>
              <p className={styles.placeholderText}>Expansion in Progress</p>
            </div>
          </div>
        )}
      </div>

      {/* ── Pagination ───────────────────────────────── */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            id="btn-prev-page"
            className={styles.pageBtn}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            ←
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              id={`btn-page-${page}`}
              className={`${styles.pageBtn} ${currentPage === page ? styles.pageBtnActive : ''}`}
              onClick={() => setCurrentPage(page)}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </button>
          ))}

          <button
            id="btn-next-page"
            className={styles.pageBtn}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            →
          </button>
        </div>
      )}
    </section>
  )
}
