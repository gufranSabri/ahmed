import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BrainCircuit,
  Code2,
  Smartphone,
  Users,
  GraduationCap,
  ScrollText,
  Paperclip,
} from 'lucide-react'
import './css/About.css'

const skillCategories = [
  {
    key: 'ai',
    label: 'ai-ml',
    icon: BrainCircuit,
    skills: ['vision-language-models', 'large-language-models', 'diffusion-models', 'computer-vision', 'nlp'],
  },
  {
    key: 'software',
    label: 'software',
    icon: Code2,
    skills: ['react', 'next.js', 'node.js', 'nestjs', 'flask', 'fastapi', 'git', 'docker', 'ci/cd'],
  },
  {
    key: 'app',
    label: 'mobile',
    icon: Smartphone,
    skills: ['flutter', 'react-native'],
  },
  {
    key: 'soft',
    label: 'soft-skills',
    icon: Users,
    skills: ['leadership', 'teaching', 'event-management'],
  },
]

const accomplishments = [
  { icon: GraduationCap, label: 'MSc. Computer Science — KFUPM' },
  { icon: GraduationCap, label: 'BSc. Computer Science — PMU' },
  { icon: ScrollText, label: '14 Research Publications' },
  { icon: Paperclip, label: '2 US Patents' },
]

const About = () => {
  const [activeCategory, setActiveCategory] = useState(skillCategories[0].key)
  const active = skillCategories.find((c) => c.key === activeCategory)

  return (
    <div className="about-root">
      <div className="about-grid">
        <motion.div
          className="panel about-terminal"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <div className="panel-titlebar">
            <span className="win-chrome">
              <span className="win-dot red" />
              <span className="win-dot yellow" />
              <span className="win-dot green" />
            </span>
            <span className="panel-filename">~/ahmed — zsh</span>
          </div>
          <div className="about-terminal-body">
            <p className="term-line">
              <span className="term-prompt">$</span> cat bio.txt
            </p>
            <p className="term-output">
              I&rsquo;m an AI researcher and developer focused on building intelligent
              systems that connect vision and language, with hands-on experience in
              deep learning, computer vision, and large language models. Beyond
              research, I&rsquo;m driven by creating tools that are both technically
              strong and genuinely useful, combining solid engineering with
              thoughtful design.
            </p>
            <p className="term-output">
              My primary interest sits at the intersection of{' '}
              <span className="syn-accent">Computer Vision</span> and{' '}
              <span className="syn-accent">Natural Language Processing</span>.
            </p>
            <p className="term-line">
              <span className="term-prompt">$</span> ls achievements/
              <span className="blink-caret">&nbsp;</span>
            </p>
            <div className="about-accomplishments">
              {accomplishments.map(({ icon: Icon, label }) => (
                <span key={label} className="chip about-chip">
                  <Icon size={13} /> {label}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="panel about-skills"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="panel-titlebar">
            <span className="win-chrome">
              <span className="win-dot red" />
              <span className="win-dot yellow" />
              <span className="win-dot green" />
            </span>
            <span className="panel-filename">skills.json</span>
          </div>

          <div className="about-skills-body">
            <pre className="skills-json-open">&#123;</pre>
            <div className="skills-tabs" role="tablist">
              {skillCategories.map((cat) => {
                const Icon = cat.icon
                const isActive = cat.key === activeCategory
                return (
                  <button
                    key={cat.key}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`skills-tab ${isActive ? 'active' : ''}`}
                    onClick={() => setActiveCategory(cat.key)}
                  >
                    <Icon size={14} />
                    <span className="syn-string">&quot;{cat.label}&quot;</span>
                  </button>
                )
              })}
            </div>

            <div className="skills-content">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.key}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="syn-string">&quot;{active.label}&quot;</span>: [
                  <div className="skills-array">
                    {active.skills.map((skill, i) => (
                      <div key={skill} className="skills-array-item">
                        <span className="syn-string">&quot;{skill}&quot;</span>
                        {i < active.skills.length - 1 ? ',' : ''}
                      </div>
                    ))}
                  </div>
                  ]
                </motion.div>
              </AnimatePresence>
            </div>
            <pre className="skills-json-close">&#125;</pre>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default About
