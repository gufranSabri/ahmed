import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Moon, Sun, Menu, X, FileCode2 } from 'lucide-react'
import { useTheme } from '../context/useTheme'
import './css/Header.css'

const TABS = [
  { href: '#home', file: 'home.tsx' },
  { href: '#about', file: 'about.tsx' },
  { href: '#experience', file: 'experience.tsx' },
  { href: '#projects', file: 'projects.tsx' },
  { href: '#contact', file: 'contact.tsx' },
]

const Header = () => {
  const { theme, toggleTheme } = useTheme()
  const [activeTab, setActiveTab] = useState('#home')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const sections = TABS.map((t) => document.querySelector(t.href)).filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(`#${entry.target.id}`)
          }
        })
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="editor-topbar">
      <div className="container editor-topbar-inner">
        <div className="editor-brand">
          <span className="win-chrome">
            <span className="win-dot red" />
            <span className="win-dot yellow" />
            <span className="win-dot green" />
          </span>
          <span className="editor-brand-name">
            <FileCode2 size={14} />
            ahmed<span className="editor-brand-ext">.dev</span>
          </span>
        </div>

        <nav className="editor-tabs">
          {TABS.map((tab) => (
            <a
              key={tab.href}
              href={tab.href}
              className={`editor-tab ${activeTab === tab.href ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.href)}
            >
              <span className="editor-tab-dot" aria-hidden="true" />
              {tab.file}
            </a>
          ))}
        </nav>

        <div className="editor-topbar-actions">
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          <button
            type="button"
            className="menu-toggle"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.nav
            className="mobile-tabs"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            {TABS.map((tab) => (
              <a
                key={tab.href}
                href={tab.href}
                onClick={() => {
                  setActiveTab(tab.href)
                  setMenuOpen(false)
                }}
              >
                <span className="editor-tab-dot" aria-hidden="true" />
                {tab.file}
              </a>
            ))}
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

export default Header
