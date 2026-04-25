import { useState } from 'react'

import './css/Experience.css'

const experiences = [
  {
    company: 'Aramco',
    location: 'Dhahran, KSA',
    role: 'Software Engineer',
    period: 'Apr 2026 - Present',
    highlights: [],
  },
  {
    company: 'ICS Dept. @ KFUPM',
    location: 'Dhahran, KSA',
    role: 'Teaching Assistant',
    period: 'Sep 2024 - Dec 2025',
    highlights: [
      'Lab Conductor - Large Language Models Course',
      'Lab Conductor - Deep Learning Course',
      'Lab Conductor - AI in Robotics Course',
      'Grader - Natural Language Processing Course',
    ],
  },
  {
    company: 'Robotics Lab @ PMU',
    location: 'Khobar, KSA',
    role: 'Robotics Engineer Intern',
    period: 'Jun 2022 - Aug 2022',
    highlights: [
      'Developed an Inventory Management System (Deep Learning)',
      'Developed a Haptic VR Glove (IoT, Game Dev)',
    ],
  }
]

const Experience = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeExperience = experiences[activeIndex]

  return (
    <div className="experience-layout">
      <aside className="experience-rail" aria-label="Companies">
        {experiences.map((item, index) => {
          const isActive = index === activeIndex

          return (
            <button
              key={item.company}
              type="button"
              className={`experience-company ${isActive ? 'active' : ''}`}
              onClick={() => setActiveIndex(index)}
            >
              <span className="experience-dot" aria-hidden="true"></span>
              <span className="experience-company-text">{item.company}</span>
            </button>
          )
        })}
      </aside>

      <article className="card experience-panel" key={activeExperience.company}>
        <header className="experience-header">
          <h3>
            {activeExperience.role}
          </h3>
          <p>{activeExperience.location}</p>
          <p className="experience-period">{activeExperience.period}</p>
        </header>

        {activeExperience.highlights.length > 0 ? (
          <ul className="experience-highlights">
            {activeExperience.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        ) : (
          <p className="experience-ongoing">
            Currently building and shipping production-ready software systems.
          </p>
        )}
      </article>
    </div>
  )
}

export default Experience
