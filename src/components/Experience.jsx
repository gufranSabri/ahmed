import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GitBranch, GitCommitHorizontal, FolderGit2 } from 'lucide-react'
import './css/Experience.css'

const experiences = [
  {
    company: 'Aramco',
    branch: 'aramco',
    location: 'Dhahran, KSA',
    role: 'AI Engineer',
    period: 'Apr 2026 - Present',
    current: true,
    highlights: [],
    projects: [
      {
        title: 'AI-Powered Space Optimization Platform',
        description: 'Building a platform that uses AI to optimize space utilization across facilities.',
        tags: ['ai', 'optimization'],
      },
      {
        title: 'Enterprise Indoor Wayfinding',
        description: 'A first-person 3D indoor navigation experience for enterprise office wayfinding, rendering floor plans and animated walking routes between points of interest.',
        tags: ['three.js', '.net', 'iis', 'bootstrap'],
      },
    ],
  },
  {
    company: 'ICS Dept. @ KFUPM',
    branch: 'kfupm-ta',
    location: 'Dhahran, KSA',
    role: 'Teaching Assistant',
    period: 'Sep 2024 - Dec 2025',
    current: false,
    highlights: [
      'Lab Conductor - Large Language Models Course',
      'Lab Conductor - Deep Learning Course',
      'Lab Conductor - AI in Robotics Course',
      'Grader - Natural Language Processing Course',
    ],
    projects: [
      {
        title: 'LLM Course Lab Materials',
        description: 'Designed and conducted hands-on labs covering fine-tuning, prompting, and evaluation of large language models.',
        tags: ['llms', 'teaching'],
      },
      {
        title: 'Deep Learning Course Labs',
        description: 'Conducted labs covering neural network fundamentals, CNNs, and training pipelines using PyTorch.',
        tags: ['deep-learning', 'pytorch'],
      },
      {
        title: 'AI in Robotics Labs',
        description: 'Guided students through applying AI techniques to robotics perception and control tasks.',
        tags: ['robotics', 'ai'],
      },
    ],
  },
  {
    company: 'Robotics Lab @ PMU',
    branch: 'pmu-robotics',
    location: 'Khobar, KSA',
    role: 'Robotics Engineer Intern',
    period: 'Jun 2022 - Aug 2022',
    current: false,
    highlights: [
      'Developed an Inventory Management System (Deep Learning)',
      'Developed a Haptic VR Glove (IoT, Game Dev)',
    ],
    projects: [
      {
        title: 'Inventory Management System',
        description: 'Built a deep learning-based system to automate inventory tracking and management.',
        tags: ['deep-learning', 'computer-vision'],
      },
      {
        title: 'Haptic VR Glove',
        description: 'Developed a haptic feedback glove for immersive VR interactions, combining IoT sensors with game development.',
        tags: ['iot', 'game-dev', 'vr'],
      },
    ],
  },
]

const Experience = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeExperience = experiences[activeIndex]

  return (
    <div className="panel experience-panel">
      <div className="panel-titlebar">
        <span className="win-chrome">
          <span className="win-dot red" />
          <span className="win-dot yellow" />
          <span className="win-dot green" />
        </span>
        <span className="panel-filename">git log --all --graph</span>
      </div>

      <div className="experience-layout">
        <aside className="experience-branches" aria-label="Branches">
          {experiences.map((item, index) => {
            const isActive = index === activeIndex

            return (
              <button
                key={item.company}
                type="button"
                className={`experience-branch ${isActive ? 'active' : ''}`}
                onClick={() => setActiveIndex(index)}
              >
                <GitBranch size={14} className="experience-branch-icon" />
                <span className="experience-branch-name">{item.branch}</span>
                {item.current ? <span className="experience-branch-head">HEAD</span> : null}
              </button>
            )
          })}
        </aside>

        <AnimatePresence mode="wait">
          <motion.div
            className="experience-detail"
            key={activeExperience.company}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.25 }}
          >
            <div className="experience-commit">
              <GitCommitHorizontal size={16} className="experience-commit-icon" />
              <div>
                <p className="experience-commit-title">
                  {activeExperience.role} <span className="syn-comment">@ {activeExperience.company}</span>
                </p>
                <p className="experience-commit-meta">
                  {activeExperience.location} · {activeExperience.period}
                </p>
              </div>
            </div>

            {activeExperience.highlights.length > 0 ? (
              <ul className="experience-highlights">
                {activeExperience.highlights.map((highlight) => (
                  <li key={highlight}>
                    <span className="syn-string">+</span> {highlight}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="experience-ongoing">
                <span className="syn-string">+</span> Currently building and shipping production-ready AI systems.
              </p>
            )}

            {activeExperience.projects?.length > 0 ? (
              <div className="experience-projects">
                <p className="experience-projects-label">
                  <FolderGit2 size={13} /> related-projects/
                </p>
                <div className="experience-projects-grid">
                  {activeExperience.projects.map((project) => (
                    <div key={project.title} className="experience-project-card">
                      <h4>{project.title}</h4>
                      <p>{project.description}</p>
                      <div className="experience-project-tags">
                        {project.tags.map((tag) => (
                          <span key={tag}>#{tag}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Experience
