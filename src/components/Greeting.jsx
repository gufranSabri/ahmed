import { useEffect, useState } from "react";
import { GraduationCap, Cat, CircleUser, FileText } from "lucide-react";
import ahmedImage from "../assets/ahmed.JPG";
import cvFile from "../assets/CV_2026.pdf";

const Greeting = () => {
  const [text, setText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [showIntro, setShowIntro] = useState(false);

  const PREFIX = "Hi, ";
  const NAME = "Ahmed";
  const SUFFIX = " here!";

  const FULL_TEXT = PREFIX + NAME + SUFFIX;

  useEffect(() => {
    let i = 0;

    const interval = setInterval(() => {
      setText(FULL_TEXT.slice(0, i + 1));
      i++;

      if (i === FULL_TEXT.length) {
        clearInterval(interval);
        setShowIntro(true);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [FULL_TEXT]);

  useEffect(() => {
    const blink = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(blink);
  }, []);

  const renderTypedText = () => {
    const typedPrefix = text.slice(0, PREFIX.length);
    const typedName = text.slice(PREFIX.length, PREFIX.length + NAME.length);
    const typedSuffix = text.slice(PREFIX.length + NAME.length);

    return (
      <>
        {typedPrefix}
        <span style={{ color: "#2dd4bf" }}>{typedName}</span>
        {typedSuffix}
      </>
    );
  };

  return (
    <div className="container d-flex align-items-center gap-4">
      <img src={ahmedImage} alt="Profile" style={{borderRadius:"100px", height:"150px", width:"150px"}}/>
        <div>
            <h1 className="greeting">
                {renderTypedText()}
                <span style={{visibility: showCursor ? "visible" : "hidden",}}>|</span>
            </h1>

            {showIntro && (
                <div style={{ animation: "fadeIn 0.6s ease-in-out" }}>
                    <p>
                    AI researcher and full-stack developer specializing in computer vision and large language models, building intelligent systems that bridge perception and language.
                    </p>

                    <button
                      className="btn btn-primary mt-3"
                      onClick={() =>
                          window.open(
                          "https://www.linkedin.com/in/ahmed-hasanaath-45751b200/",
                          "_blank"
                          )
                      }
                      >
                      <CircleUser size={18} /> &nbsp; LinkedIn
                    </button>

                    <button
                      className="btn btn-info mt-3"
                      onClick={() =>
                          window.open(
                          "https://scholar.google.com/citations?user=Zt9nXoAAAAJ&hl=en",
                          "_blank"
                          )
                      }
                      style={{ marginLeft: "10px" }}
                      >
                      <GraduationCap size={18} /> &nbsp; Google Scholar
                    </button>

                    <button
                      className="btn btn-danger mt-3"
                      onClick={() =>
                          window.open("https://github.com/gufranSabri", "_blank")
                      }
                      style={{ marginLeft: "10px" }}
                      >
                      <Cat size={18} /> &nbsp; Github
                    </button>

                    <a
                      className="btn btn-success mt-3"
                      href={cvFile}
                      download
                      style={{ marginLeft: "10px" }}
                      >
                      <FileText size={18} /> &nbsp; Download CV
                    </a>
                </div>
            )}
        </div>
    </div>
  );
};

export default Greeting;