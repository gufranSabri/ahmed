import { useEffect, useMemo, useRef, useState } from 'react'
import { CodeXml, ChevronLeft, ChevronRight, FileText, Folder } from 'lucide-react'

import './css/Projects.css'

const projects = [
  {
    title: 'USTM: Unified Spatial and Temporal Modeling for Continuous Sign Language Recognition',
    description:
      'Developed a novel video adapter for vision transformers to improve temporal learning for sign language recognition. Achieved state-of-the-art results on benchmarks.',
    tags: ['Vision Transformers', 'Temporal Modeling', 'PyTorch'],
    githubUrl: 'https://github.com/gufranSabri/USTM',
    paperUrl: "https://arxiv.org/pdf/2512.13415",
  },

  {
    title: 'EyeQ: Conversational Diagnostic Assistant for Ocular and Systemic Disease Risk Assessment',
    description: 'Built a multimodal conversational diagnostic AI with interactive dashboards, securing 1st place at KKESH EyeHackathon 2025.',
    tags: ['Multimodal LLMs', 'Conversational AI', 'Dashboard Systems'],
    githubUrl: null,
    paperUrl: null,
  },

  {
    title: 'ViPo-MLLM: Visual-Pose Multimodal LLM for Gloss-Free Sign Language Translation',
    description: 'Developed a multimodal sign language translation system; achieved state-of-the-art results on benchmarks.',
    tags: ['Vision Transformers', 'Multimodal Learning', 'PyTorch'],
    githubUrl: 'https://github.com/gufranSabri/ViPo-SLT',
    paperUrl: null,
  },

  {
    title: 'SignEval 2025 Challenge @ ICCV Workshop',
    description: 'Co-managed an ICCV 2025 workshop, developing the official website and a starter kit for the sign language recognition challenge.',
    tags: ['React', 'JavaScript', 'Web Development'],
    githubUrl: "https://multimodal-sign-language-recognition.github.io/ICCV-2025/",
    paperUrl: "https://openaccess.thecvf.com/content/ICCV2025W/MSLR/papers/Luqman_The_SignEval_2025_Challenge_at_the_ICCV_Multimodal_Sign_Language_ICCVW_2025_paper.pdf",
  },


  {
    title: 'KI-CLIP: Knowledge-Injected Distillation for Action Recognition',
    description: 'Improved knowledge distillation in a CLIP framework for open vocabulary action recognition. Achieved state-of-the-art results on benchmarks.',
    tags: ['CLIP', 'Knowledge Distillation', 'PyTorch'],
    githubUrl: 'https://github.com/gufranSabri/KICLIP',
    paperUrl: null,
  },

  {
    title: 'FSBI: Deepfake detection with frequency enhanced self-blended images.',
    description: 'Self-Blended images: create synthetic deep fakes using various face augmentation techniques. Enhance using Discrete Wavelet Transforms to prioritize frequency artifacts in deepfakes.',
    tags: ['Deepfake Detection', 'Wavelet Transform', 'PyTorch'],
    githubUrl: 'https://github.com/gufranSabri/FSBI',
    paperUrl: "https://arxiv.org/pdf/2406.08625",
  },

  {
    title: 'AraReasoner: Evaluating Reasoning-Based LLMs for Arabic NLP',
    description: 'This study benchmarks reasoning-focused LLMs on diverse Arabic NLP tasks, showing that few-shot prompting, DeepSeek architectures, and LoRA fine-tuning significantly improve performance on complex linguistic reasoning.',
    tags: ['Large Language Models', 'Few-shot Learning', 'LoRA'],
    githubUrl: 'https://github.com/gufranSabri/deepseek-evals',
    paperUrl: "https://aclanthology.org/anthology-files/pdf/findings/2025.findings-emnlp.1028.pdf",
  },

  {
    title: 'Multi-task Stance Detection using BERT Ensemble with Attention Based Aggregation',
    description: 'Built a multi-task, attention-based ensemble of BERT models that leverages diverse Arabic dialects to improve stance detection across key social topics.',
    tags: ['BERT', 'Multi-task Learning', 'Attention Mechanism'],
    githubUrl: 'https://github.com/gufranSabri/FSBI',
    paperUrl: "https://github.com/gufranSabri/StanceDetection-MultiTaskLearning",
  },

  {
    title: 'Automated Conference Recommendations Engine for Research Papers',
    description: 'Developed a web-based tool that recommends suitable conferences using NLP with custom embeddings and web crawling.',
    tags: ['NLP', 'Web Crawling', 'React'],
    githubUrl: "https://github.com/gufranSabri/Conference-Recommendations-Engine-for-Research-Papers",
    paperUrl: null,
  }
]

const Projects = () => {
  const carouselRef = useRef(null)
  const [perPage, setPerPage] = useState(1)
  const [activePage, setActivePage] = useState(0)

  useEffect(() => {
    const updatePerPage = () => {
      if (!carouselRef.current) return

      const containerWidth = carouselRef.current.clientWidth
      const minCardWidth = 285
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

    for (let index = 0; index < projects.length; index += perPage) {
      chunks.push(projects.slice(index, index + perPage))
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
    <div className="projects-root">
      <div className="projects-carousel-shell">
        <button
          type="button"
          className="projects-nav-button"
          onClick={() => scrollToPage(visiblePage - 1)}
          disabled={visiblePage === 0}
          aria-label="Previous projects page"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="projects-carousel-window" ref={carouselRef}>
          <div className="projects-track">
            {pages.map((page, pageIndex) => (
              <div
                key={`page-${pageIndex}`}
                className="projects-page"
                style={{ gridTemplateColumns: `repeat(${page.length}, minmax(0, 1fr))` }}
              >
                {page.map((project) => (
                  <article key={project.title} className="project-card">
                    <div className="project-card-header-icons">
                      <Folder size={18} />
                      <div className="project-card-actions">
                        {project.githubUrl ? (
                          <a href={project.githubUrl} target="_blank" rel="noreferrer" aria-label="Project GitHub">
                            <CodeXml size={17} />
                          </a>
                        ) : null}
                        {project.paperUrl ? (
                          <a href={project.paperUrl} target="_blank" rel="noreferrer" aria-label="Project paper">
                            <FileText size={17} />
                          </a>
                        ) : null}
                      </div>
                    </div>

                    <h3>{project.title}</h3>
                    <p>{project.description}</p>

                    <div className="project-tags">
                      {project.tags.map((tag) => (
                        <span key={`${project.title}-${tag}`}>{tag}</span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="projects-nav-button"
          onClick={() => scrollToPage(visiblePage + 1)}
          disabled={visiblePage === pages.length - 1}
          aria-label="Next projects page"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="projects-indicators" aria-label="Projects pages">
        {pages.map((_, index) => (
          <button
            key={`indicator-${index}`}
            type="button"
            className={`projects-indicator ${index === visiblePage ? 'active' : ''}`}
            onClick={() => scrollToPage(index)}
            aria-label={`Go to projects page ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default Projects
