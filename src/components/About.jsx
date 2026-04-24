import {
  Webcam,
  Sparkles,
  CodeXml,
  GraduationCap,
  ScrollText,
  Paperclip,
  SmartphoneCharging
} from 'lucide-react'

import './css/About.css'


const About = () => {
  return (
    <div>
        <article className="card about-card">
            <p>
                I’m an AI researcher and developer focused on building intelligent systems that connect vision and language, 
                with hands-on experience in deep learning, computer vision, and large language models. Beyond research, I’m driven by 
                creating tools that are both technically strong and genuinely useful, combining solid engineering with thoughtful design.
            </p>
            <p>
                My primary interest sits at the intersection of Computer Vision and Natural Language Processing.
            </p>
            <div className="about-tags">
                <span><Webcam size={14} /> Computer Vision</span>
                <span><Sparkles size={14} /> NLP</span>
                <span><CodeXml size={14} /> Web Development</span>
                <span><SmartphoneCharging size={14} /> App Development</span>
            </div>
        </article>


        <div className="accomplishment-tags">
            <span style={{backgroundColor: "#28615e"}}><GraduationCap size={14} /> MSc. in Computer Science @ KFUPM, KSA</span>
            <span style={{backgroundColor: "#28615e"}}><GraduationCap size={14} /> BSc. in Computer Science @ PMU, KSA</span>
            <span><ScrollText size={14} /> 12 Publications</span>
            <span><Paperclip size={14} /> 2 US Patents</span>
            <span><ScrollText size={14} /> 230 Citations</span>
        </div>
        
    </div>
  )
}

export default About
