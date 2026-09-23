import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import './css/Blog.css'

import eyeHackathon from '../assets/eyehackathon.JPG'
import jrcaiHackathon from '../assets/jrcai_hackathon.png'
import sdaiaHackathon from '../assets/sdaia_hackathon.png'

const posts = [
  {
    heading: '1st Place @ KKESH TheEyeHackathon 2026',
    date: '2025-12-13',
    description: 'Built a conversational diagnostic AI with multimodal LLMs; user interface with xAI dashboards.',
    image: eyeHackathon,
    status: 'passed',
  },
  {
    heading: '2nd Place @ JRCAI Poster Competition',
    date: '2024-12-19',
    description: 'Built a diffusion-based radiology image generation approach that enhances text-image alignment using LLM-refined captions and a VGG16-based UNet.',
    image: jrcaiHackathon,
    status: 'passed',
  },
  {
    heading: 'Medical Data Fusion Hackathon @ SDAIA',
    date: '2023-12-05',
    description: 'Utilized clinical data, extracted pathology features and pathology images of lung tissue to predict Progression Free Survival.',
    image: sdaiaHackathon,
    status: 'passed',
  },
]

const Blog = () => {
  return (
    <div className="panel highlights-panel">
      <div className="panel-titlebar">
        <span className="win-chrome">
          <span className="win-dot red" />
          <span className="win-dot yellow" />
          <span className="win-dot green" />
        </span>
        <span className="panel-filename">ci / build-log</span>
      </div>

      <div className="highlights-list">
        {posts.map((post, index) => (
          <motion.article
            key={post.heading}
            className="highlight-row"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
          >
            <div className="highlight-status">
              <CheckCircle2 size={16} />
            </div>

            <div
              className="highlight-thumb"
              style={{ backgroundImage: `url(${post.image})` }}
              aria-hidden="true"
            />

            <div className="highlight-body">
              <p className="highlight-title">{post.heading}</p>
              <p className="highlight-desc">{post.description}</p>
            </div>

            <span className="highlight-date">{post.date}</span>
          </motion.article>
        ))}
      </div>
    </div>
  )
}

export default Blog
