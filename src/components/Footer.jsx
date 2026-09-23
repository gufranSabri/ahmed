import './css/Footer.css'

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container site-footer-inner">
        <span>ahmed-portfolio</span>
        <span className="site-footer-sep">·</span>
        <span>main</span>
        <span className="site-footer-sep">·</span>
        <span>&copy; {new Date().getFullYear()} Ahmed Abul Hasanaath</span>
        <span className="site-footer-spacer" />
        <span className="site-footer-live">
          <span className="site-footer-dot" /> built with react
        </span>
      </div>
    </footer>
  )
}

export default Footer
