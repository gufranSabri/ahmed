import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CodeXml, FileText, FlaskConical, Trophy, Laptop, ArrowUpRight } from 'lucide-react'
import './css/Projects.css'

const categories = [
  { key: 'research', label: 'research', icon: FlaskConical },
  { key: 'hackathons', label: 'hackathons', icon: Trophy },
  { key: 'software', label: 'software', icon: Laptop },
]

const projects = [
  {
    category: 'research',
    title: 'QKV-Lens: QKV Projections as Visual Fields for Hallucination Detection',
    description:
      'Extracted pre-attention QKV projections from every transformer layer and arranged them as multi-channel feature maps, preserving internal-representation structure. A CNN-based detector achieves state-of-the-art hallucination detection on CoQA, TriviaQA, and TruthfulQA.',
    tags: ['interpretability', 'hallucination-detection', 'transformers'],
    githubUrl: null,
    paperUrl: null,
    status: 'submitted',
    venue: 'Neural Networks',
  },
  {
    category: 'research',
    title: 'ViPo-MLLM: Visual-Pose Multimodal LLM for Gloss-Free Sign Language Translation',
    description: 'Fused visual and pose streams in a multimodal LLM for gloss-free sign language translation; achieved state-of-the-art results on benchmarks.',
    tags: ['vision-transformers', 'multimodal'],
    githubUrl: 'https://github.com/gufranSabri/ViPo-SLT',
    paperUrl: null,
    status: 'published',
    venue: 'ICIP 2026',
  },
  {
    category: 'research',
    title: 'Modeling Early Stage Temporal Dynamics for Continuous Sign Language Recognition',
    description:
      'Developed a novel video adapter for vision transformers to strengthen early-stage temporal learning for sign language recognition. Achieved state-of-the-art results on CSLR benchmarks.',
    tags: ['vision-transformers', 'temporal-modeling'],
    githubUrl: 'https://github.com/gufranSabri/USTM',
    paperUrl: 'https://arxiv.org/pdf/2512.13415',
    status: 'submitted',
    venue: 'IEEE TETCI',
  },
  {
    category: 'research',
    title: 'KI-CLIP: Knowledge-Injected Distillation for Action Recognition',
    description: 'Showed parameter-free averaging of teacher-student intermediate representations beats learnable injection for CLIP distillation, achieving state-of-the-art open-vocabulary action recognition on benchmark datasets.',
    tags: ['clip', 'knowledge-distillation'],
    githubUrl: 'https://github.com/gufranSabri/KICLIP',
    paperUrl: null,
    status: 'submitted',
    venue: 'IEEE TIP',
  },
  {
    category: 'research',
    title: 'FSBI: Deepfake Detection with Frequency Enhanced Self-Blended Images',
    description: 'Self-Blended images: create synthetic deep fakes using various face augmentation techniques. Enhance using Discrete Wavelet Transforms to prioritize frequency artifacts in deepfakes.',
    tags: ['deepfake-detection', 'wavelet-transform'],
    githubUrl: 'https://github.com/gufranSabri/FSBI',
    paperUrl: 'https://arxiv.org/pdf/2406.08625',
    status: 'published',
    venue: 'Image & Vision Computing',
  },
  {
    category: 'research',
    title: 'AraReasoner: Evaluating Reasoning-Based LLMs for Arabic NLP',
    description: 'This study benchmarks reasoning-focused LLMs on diverse Arabic NLP tasks, showing that few-shot prompting, DeepSeek architectures, and LoRA fine-tuning significantly improve performance on complex linguistic reasoning.',
    tags: ['llms', 'few-shot', 'lora'],
    githubUrl: 'https://github.com/gufranSabri/deepseek-evals',
    paperUrl: 'https://aclanthology.org/anthology-files/pdf/findings/2025.findings-emnlp.1028.pdf',
    status: 'published',
    venue: 'EMNLP 2025',
  },
  {
    category: 'research',
    title: 'Multi-task Stance Detection using BERT Ensemble with Attention Based Aggregation',
    description: 'Built a multi-task, attention-based ensemble of BERT models that leverages diverse Arabic dialects to improve stance detection across key social topics.',
    tags: ['bert', 'multi-task', 'attention'],
    githubUrl: 'https://github.com/gufranSabri/StanceDetection-MultiTaskLearning',
    paperUrl: null,
    status: 'published',
    venue: 'ArabicNLP 2024',
  },
  {
    category: 'research',
    title: 'Isharah-Selfie: A Selfie-Captured Dataset for Continuous Sign Language Recognition',
    description: 'A large-scale Arabic Sign Language dataset — 8,997 clips, 16 signers, 1,493 sentences — captured with front-facing smartphone cameras and annotated with glosses and translations.',
    tags: ['dataset', 'sign-language'],
    githubUrl: null,
    paperUrl: null,
    status: 'submitted',
    venue: 'NeurIPS 2026',
  },
  {
    category: 'hackathons',
    title: 'EyeQ: Conversational Diagnostic Assistant for Ocular and Systemic Disease Risk Assessment',
    description: 'Built a multimodal conversational diagnostic AI with interactive dashboards, securing 1st place at KKESH EyeHackathon 2025.',
    tags: ['multimodal-llms', 'conversational-ai', 'xai'],
    githubUrl: null,
    paperUrl: null,
  },
  {
    category: 'hackathons',
    title: 'LLM-Based Caption Augmentation for Text-Guided Radiology Image Generation',
    description: '2nd place at the JRCAI Poster Competition. Used LLM-transformed captions and a RadBERT text encoder to guide a diffusion model, comparing a standard UNet against a custom VGG16-based UNet — the VGG16 variant with transformed captions achieved the best FID score.',
    tags: ['diffusion-models', 'radbert', 'medical-imaging'],
    githubUrl: 'https://github.com/gufranSabri/TextToImage-Diffusion-RadiologyImages',
    paperUrl: null,
  },
  {
    category: 'hackathons',
    title: 'Predicting Progression-Free Survival in Non-Small Cell Lung Cancer',
    description: 'SDAIA × Stanford Medical Data Fusion Hackathon. Combined clinical data, pathology features, pathology images, and genomic features using early and late fusion to predict progression-free survival in NSCLC patients.',
    tags: ['multimodal-fusion', 'healthcare', 'genomics'],
    githubUrl: 'https://github.com/gufranSabri/Predicting-Progression-Free-Survival-in-patients-with-Non-Small-Cell-Lung-Cancer',
    paperUrl: null,
  },
  {
    category: 'software',
    title: 'Automated Conference Recommendations Engine for Research Papers',
    description: 'Developed a web-based tool that recommends suitable conferences using NLP with custom embeddings and web crawling.',
    tags: ['nlp', 'web-crawling'],
    stack: ['react', 'bootstrap', 'javascript'],
    githubUrl: 'https://github.com/gufranSabri/Conference-Recommendations-Engine-for-Research-Papers',
    paperUrl: null,
  },
  {
    category: 'software',
    title: 'Rattlesnek',
    description: 'A multiplayer-ready snake game with user accounts and a live leaderboard, built as a full-stack app with a containerized deployment pipeline shipped through Kubernetes.',
    tags: ['game-dev', 'leaderboard', 'accounts'],
    stack: ['react', 'typescript', 'vite', 'flask', 'mongodb', 'docker', 'kubernetes', 'jenkins', 'argocd'],
    githubUrl: null,
    paperUrl: null,
  },
  {
    category: 'software',
    title: 'Indoor Wayfinding — Enterprise Indoor Navigation',
    description: 'A first-person 3D indoor wayfinding viewer for enterprise office navigation, rendering floor plans and animated walking routes between points of interest, embedded in a .NET/Blazor host and served via IIS.',
    tags: ['3d-navigation', 'enterprise', 'wayfinding'],
    stack: ['three.js', '.net', 'iis', 'bootstrap'],
    githubUrl: null,
    paperUrl: null,
  },
]

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('research')
  const filtered = projects.filter((p) => p.category === activeCategory)

  return (
    <div className="panel projects-panel">
      <div className="panel-titlebar">
        <span className="win-chrome">
          <span className="win-dot red" />
          <span className="win-dot yellow" />
          <span className="win-dot green" />
        </span>
        <span className="panel-filename">
          grep -r --category=<span className="syn-string">{activeCategory}</span> ./projects
        </span>
      </div>

      <div className="projects-filterbar">
        {categories.map((cat) => {
          const Icon = cat.icon
          const isActive = cat.key === activeCategory
          const count = projects.filter((p) => p.category === cat.key).length

          return (
            <button
              key={cat.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`projects-filter ${isActive ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.key)}
            >
              <Icon size={14} />
              --{cat.label}
              <span className="projects-filter-count">{count}</span>
            </button>
          )
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          className="projects-list"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {filtered.map((project, index) => (
            <motion.article
              key={project.title}
              className="project-row"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
            >
              <span className="project-row-index">{String(index + 1).padStart(2, '0')}</span>

              <div className="project-row-body">
                <div className="project-row-heading">
                  <h3>{project.title}</h3>
                  {project.venue ? (
                    <span className={`venue-tag venue-tag-${project.status}`}>
                      {project.status === 'published' ? 'Published' : 'Submitted'} — {project.venue}
                    </span>
                  ) : null}
                </div>
                <p>{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={`${project.title}-${tag}`}>#{tag}</span>
                  ))}
                </div>
                {project.stack ? (
                  <div className="project-stack">
                    {project.stack.map((tech) => (
                      <span key={`${project.title}-${tech}`} className="stack-chip">
                        {tech}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>

              <div className="project-row-actions">
                {project.githubUrl ? (
                  <a href={project.githubUrl} target="_blank" rel="noreferrer" aria-label="Project GitHub">
                    <CodeXml size={16} />
                  </a>
                ) : null}
                {project.paperUrl ? (
                  <a href={project.paperUrl} target="_blank" rel="noreferrer" aria-label="Project paper">
                    <FileText size={16} />
                  </a>
                ) : null}
                {!project.githubUrl && !project.paperUrl ? (
                  <ArrowUpRight size={16} className="project-row-noop" />
                ) : null}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default Projects
