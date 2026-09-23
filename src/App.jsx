import SectionWrapper from './components/SectionWrapper'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Blog from './components/Blog'
import Contact from './components/Contact'
import Footer from './components/Footer'

const App = () => {
  return (
    <div>
      <Header />

      <Hero />

      <SectionWrapper id="highlights" index="01" fnName="highlights" heading="Recognition">
        <Blog />
      </SectionWrapper>

      <SectionWrapper id="about" index="02" fnName="about" heading="Who I Am">
        <About />
      </SectionWrapper>

      <SectionWrapper id="experience" index="03" fnName="experience" heading="Career Log">
        <Experience />
      </SectionWrapper>

      <SectionWrapper id="projects" index="04" fnName="projects" heading="Selected Work">
        <Projects />
      </SectionWrapper>

      <SectionWrapper id="contact" index="05" fnName="contact" heading="Get In Touch">
        <Contact />
      </SectionWrapper>

      <Footer />
    </div>
  )
}

export default App
