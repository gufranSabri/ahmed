import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, Cat, CircleUser, FileText, ChevronDown } from 'lucide-react'
import ParticlePortrait from './ParticlePortrait'
import cvFile from '../assets/CV_2026.pdf'
import './css/Hero.css'

const ROLE_STRINGS = [
  'AI Researcher',
  'Computer Vision Engineer',
  'NLP Engineer',
  'Full-Stack Developer',
]

const useTypewriter = (words, { typeSpeed = 65, deleteSpeed = 35, pause = 1600 } = {}) => {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[index % words.length]
    let timeout

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && text === '') {
      timeout = setTimeout(() => {
        setDeleting(false)
        setIndex((i) => i + 1)
      }, typeSpeed)
    } else {
      timeout = setTimeout(() => {
        setText((prev) =>
          deleting ? prev.slice(0, -1) : current.slice(0, prev.length + 1)
        )
      }, deleting ? deleteSpeed : typeSpeed)
    }

    return () => clearTimeout(timeout)
  }, [text, deleting, index, words, typeSpeed, deleteSpeed, pause])

  return text
}

const Hero = () => {
  const roleText = useTypewriter(ROLE_STRINGS)

  return (
    <section id="home" className="hero">
      <div className="container hero-container">
        <motion.div
          className="panel hero-editor"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="panel-titlebar">
            <span className="win-chrome">
              <span className="win-dot red" />
              <span className="win-dot yellow" />
              <span className="win-dot green" />
            </span>
            <span className="panel-filename">about-me.js</span>
            <span className="panel-titlebar-spacer" />
          </div>

          <div className="hero-body">
            <div className="hero-code">
              <pre className="hero-code-block">
                <span className="gutter-number">1</span>
                <span><span className="syn-keyword">const</span> <span className="syn-const">dev</span> = &#123;</span>
                {'\n'}
                <span className="gutter-number">2</span>
                <span>  name: <span className="syn-string">'Ahmed Abul Hasanaath'</span>,</span>
                {'\n'}
                <span className="gutter-number">3</span>
                <span>  role: <span className="syn-string">'{roleText}</span><span className="blink-caret">&nbsp;</span><span className="syn-string">'</span>,</span>
                {'\n'}
                <span className="gutter-number">4</span>
                <span>  focus: [<span className="syn-string">'vision'</span>, <span className="syn-string">'language'</span>],</span>
                {'\n'}
                <span className="gutter-number">5</span>
                <span>  <span className="syn-function">buildsSystemsThat</span>: () =&gt; &#123;</span>
                {'\n'}
                <span className="gutter-number">6</span>
                <span>    <span className="syn-keyword">return</span> <span className="syn-string">'bridge perception and language'</span>;</span>
                {'\n'}
                <span className="gutter-number">7</span>
                <span>  &#125;,</span>
                {'\n'}
                <span className="gutter-number">8</span>
                <span>&#125;;</span>
              </pre>

              <motion.p
                className="hero-desc"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <span className="syn-comment">
                  {'// building intelligent systems from state-of-the-art sign-language'}
                  <br />
                  {'// models to production AI products.'}
                </span>
              </motion.p>

              <motion.div
                className="hero-actions"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.5 }}
              >
                <a
                  className="btn btn-primary"
                  href="https://www.linkedin.com/in/ahmed-hasanaath-45751b200/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <CircleUser size={15} /> linkedin
                </a>
                <a
                  className="btn"
                  href="https://scholar.google.com/citations?user=Zt9nXoAAAAJ&hl=en"
                  target="_blank"
                  rel="noreferrer"
                >
                  <GraduationCap size={15} /> scholar
                </a>
                <a className="btn" href="https://github.com/gufranSabri" target="_blank" rel="noreferrer">
                  <Cat size={15} /> github
                </a>
                <a className="btn" href={cvFile} download>
                  <FileText size={15} /> resume.pdf
                </a>
              </motion.div>
            </div>

            <motion.div
              className="hero-portrait"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <ParticlePortrait />
            </motion.div>
          </div>

          <div className="hero-statusbar">
            <span>UTF-8</span>
            <span>JavaScript</span>
            <span className="hero-statusbar-spacer" />
            <span className="hero-statusbar-live">
              <span className="hero-statusbar-live-dot" /> online
            </span>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#highlights"
        className="hero-scroll-cue"
        aria-label="Scroll down"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown size={16} />
      </motion.a>
    </section>
  )
}

export default Hero
