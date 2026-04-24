import { Mail, Phone } from 'lucide-react'

import './css/Contact.css'

const Contact = () => {
  return (
    <section className="contact-root" aria-label="Contact details">
      <p className="contact-kicker">Let us build something meaningful.</p>

      <div className="contact-card">
        <a className="contact-item" href="tel:+966507794453" aria-label="Call Ahmed on +966 50 779 4453">
          <span className="contact-icon" aria-hidden="true">
            <Phone size={16} />
          </span>
          <span className="contact-copy">
            <span className="contact-label">Phone</span>
            <span className="contact-value">+966 50 779 4453</span>
          </span>
        </a>

        <a className="contact-item" href="mailto:ahmed.ghuf@gmail.com" aria-label="Email Ahmed at ahmed.ghuf@gmail.com">
          <span className="contact-icon" aria-hidden="true">
            <Mail size={16} />
          </span>
          <span className="contact-copy">
            <span className="contact-label">Email</span>
            <span className="contact-value">ahmed.ghuf@gmail.com</span>
          </span>
        </a>
      </div>
    </section>
  )
}

export default Contact
