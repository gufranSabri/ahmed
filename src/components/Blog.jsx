import { useEffect, useMemo, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import './css/Blog.css'

import eye_hackathon from "../assets/eyehackathon.JPG";
import jrcai_hackathon from "../assets/jrcai_hackathon.png";
import sdaia_hackathon from "../assets/sdaia_hackathon.png";

const posts = [
  {
    heading: '1st Place @ KKESH TheEyeHackathon 2026',
    date: 'December 13, 2025',
    description:
      'Built a conversational diagnostic AI with multimodal LLMs; User interface with xAI dashboards.',
    image:
      eye_hackathon,
  },
  

  {
    heading: '2nd Place @ JRCAI Poster Competition',
    date: 'December 19, 2024',
    description:
      'Built a diffusion-based radiology image generation approach that enhances text-image alignment using LLM-refined captions and a VGG16-based UNet.',
    image:
      jrcai_hackathon,
  },

  {
    heading: 'Participated in Medical Data Fusion Hackathon @ SDAIA',
    date: 'December 5, 2023',
    description:
      'Utilized the clinical data, extracted pathology features and pathology images of lung tissue to predict Progression Free Survival.',
    image:
      sdaia_hackathon,
  },
]

const Blog = () => {
  const carouselRef = useRef(null)
  const [perPage, setPerPage] = useState(1)
  const [activePage, setActivePage] = useState(0)

  useEffect(() => {
    const updatePerPage = () => {
      if (!carouselRef.current) return

      const containerWidth = carouselRef.current.clientWidth
      const minCardWidth = 280
      const gap = 16
      const computedPerPage = Math.min(3, Math.max(1, Math.floor((containerWidth + gap) / (minCardWidth + gap))))
      setPerPage(computedPerPage)
    }

    updatePerPage()

    const observer = new ResizeObserver(updatePerPage)
    if (carouselRef.current) {
      observer.observe(carouselRef.current)
    }

    window.addEventListener('resize', updatePerPage)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', updatePerPage)
    }
  }, [])

  const pages = useMemo(() => {
    const chunks = []

    for (let index = 0; index < posts.length; index += perPage) {
      chunks.push(posts.slice(index, index + perPage))
    }

    return chunks
  }, [perPage])

  useEffect(() => {
    const carousel = carouselRef.current

    if (!carousel) return

    const updateActivePage = () => {
      if (!carousel.clientWidth) return

      const nextPage = Math.round(carousel.scrollLeft / carousel.clientWidth)
      setActivePage(Math.max(0, Math.min(nextPage, pages.length - 1)))
    }

    carousel.addEventListener('scroll', updateActivePage, { passive: true })

    return () => {
      carousel.removeEventListener('scroll', updateActivePage)
    }
  }, [pages.length])

  const visiblePage = Math.min(activePage, Math.max(0, pages.length - 1))

  const scrollToPage = (pageIndex) => {
    const carousel = carouselRef.current

    if (!carousel) return

    const nextPage = Math.max(0, Math.min(pageIndex, pages.length - 1))

    carousel.scrollTo({
      left: nextPage * carousel.clientWidth,
      behavior: 'smooth',
    })

    setActivePage(nextPage)
  }

  return (
    <section className="blog-root" aria-label="Blog highlights">
      <div className="blog-carousel-shell">
        <button
          type="button"
          className="blog-nav-button"
          onClick={() => scrollToPage(visiblePage - 1)}
          disabled={visiblePage === 0}
          aria-label="Previous blog posts"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="blog-carousel-window" ref={carouselRef}>
          <div className="blog-track">
            {pages.map((page, pageIndex) => (
              <div
                key={`page-${pageIndex}`}
                className="blog-page"
                style={{ gridTemplateColumns: `repeat(${page.length}, minmax(0, 1fr))` }}
              >
                {page.map((post) => (
                  <article key={post.heading} className="blog-card" style={{ backgroundImage: `url(${post.image})` }}>
                    <div className="blog-card-overlay">
                      <h3>{post.heading}</h3>
                      <p className="blog-date">{post.date}</p>
                      <p className="blog-description">{post.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="blog-nav-button"
          onClick={() => scrollToPage(visiblePage + 1)}
          disabled={visiblePage === pages.length - 1}
          aria-label="Next blog posts"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="blog-indicators" aria-label="Blog pages">
        {pages.map((_, index) => (
          <button
            key={`blog-indicator-${index}`}
            type="button"
            className={`blog-indicator ${index === visiblePage ? 'active' : ''}`}
            onClick={() => scrollToPage(index)}
            aria-label={`Go to blog posts page ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

export default Blog
