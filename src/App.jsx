import SectionWrapper from './components/SectionWrapper'
import Header from './components/header'
import Greeting from './components/greeting'
import About from './components/about'
import Experience from './components/experience'
import Projects from './components/projects'
import Blog from './components/blog'
import Contact from './components/contact'

const App = () => {
  return (
    <div>
      <Header/>

      <SectionWrapper id="home" heading="" lineVisibility={false}>
        <Greeting/>
      </SectionWrapper>

      <div style={{padding:"35px"}}></div>

      <SectionWrapper heading="/Blog" lineVisibility={true}>
        <Blog/>
      </SectionWrapper>

      <div style={{padding:"75px"}}></div>

      <SectionWrapper id="about" heading="/About Me" lineVisibility={true}>
        <About/>
      </SectionWrapper>

      <div style={{padding:"75px"}}></div>

      <SectionWrapper id="experience" heading="/Experience" lineVisibility={true}>
        <Experience/>
      </SectionWrapper>

      <div style={{padding:"75px"}}></div>

      <SectionWrapper id="projects" heading="/Projects & Publications" lineVisibility={true}>
        <Projects/>
      </SectionWrapper>

      <div style={{padding:"75px"}}></div>

      <SectionWrapper id="contact" heading="/Contact" lineVisibility={true}>
        <Contact/>
      </SectionWrapper>

      <div style={{padding:"50px"}}></div>

    </div>
  )
}

export default App
