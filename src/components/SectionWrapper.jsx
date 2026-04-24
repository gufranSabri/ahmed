import './css/SectionWrapper.css'
import { useEffect, useRef, useState } from 'react'

const SectionWrapper = ({ id, heading, children, lineVisibility }) => {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const currentSection = sectionRef.current

    if (!currentSection) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(currentSection)
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(currentSection)

    return () => {
      observer.unobserve(currentSection)
    }
  }, [])

  return (
    <section
      className={`section-wrapper container ${isVisible ? 'is-visible' : ''}`}
      id={id}
      ref={sectionRef}
    >
      <div className='section-header'>
        <h2 className='section-heading'>{heading}</h2>
        <div className='section-line' style={{visibility: lineVisibility ? "visible" : "hidden"}}></div>
      </div>
      {children}
    </section>
  )
}

export default SectionWrapper
