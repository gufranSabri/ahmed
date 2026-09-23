import { motion } from 'framer-motion'
import { Mail, Phone, Cat, CircleUser } from 'lucide-react'
import './css/Contact.css'

const contactMethods = [
  {
    key: 'EMAIL',
    icon: Mail,
    value: 'ahmed.ghuf@gmail.com',
    href: 'mailto:ahmed.ghuf@gmail.com',
  },
  {
    key: 'PHONE',
    icon: Phone,
    value: '+966 50 779 4453',
    href: 'tel:+966507794453',
  },
  {
    key: 'LINKEDIN',
    icon: CircleUser,
    value: 'ahmed-hasanaath',
    href: 'https://www.linkedin.com/in/ahmed-hasanaath-45751b200/',
  },
  {
    key: 'GITHUB',
    icon: Cat,
    value: 'gufranSabri',
    href: 'https://github.com/gufranSabri',
  },
]

const Contact = () => {
  return (
    <div className="panel contact-panel">
      <div className="panel-titlebar">
        <span className="win-chrome">
          <span className="win-dot red" />
          <span className="win-dot yellow" />
          <span className="win-dot green" />
        </span>
        <span className="panel-filename">.env.contact</span>
      </div>

      <div className="contact-body">
        <motion.p
          className="contact-comment"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <span className="syn-comment">{"// let's build something meaningful together"}</span>
        </motion.p>

        <div className="contact-vars">
          {contactMethods.map(({ key, icon: Icon, value, href }, index) => (
            <motion.a
              key={key}
              className="contact-var"
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noreferrer' : undefined}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.07 }}
            >
              <Icon size={14} className="contact-var-icon" />
              <span className="syn-const">{key}</span>
              <span className="contact-var-eq">=</span>
              <span className="syn-string">&quot;{value}&quot;</span>
            </motion.a>
          ))}
        </div>

        <p className="contact-prompt">
          <span className="term-prompt">$</span> echo &quot;thanks for stopping by&quot;
          <span className="blink-caret">&nbsp;</span>
        </p>
      </div>
    </div>
  )
}

export default Contact
