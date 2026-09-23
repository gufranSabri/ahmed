import { motion } from 'framer-motion'
import './css/SectionWrapper.css'

const SectionWrapper = ({ id, index, fnName, heading, children }) => {
  return (
    <motion.section
      className="section-wrapper container"
      id={id}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {heading ? (
        <div className="section-header">
          <p className="section-kicker">
            <span className="num">{index}</span>
            <span>//</span>
            <span>{heading.toLowerCase().replace(/\s+/g, '-')}</span>
          </p>
          <h2 className="section-heading">
            <span className="fn">{fnName}</span>
            <span className="punct">(</span>
            {heading}
            <span className="punct">)</span>
          </h2>
        </div>
      ) : null}
      {children}
    </motion.section>
  )
}

export default SectionWrapper
