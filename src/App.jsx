
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ScrollArtwork from "./components/ScrollArtwork";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import About from "./components/About";
import Contact from "./components/Contact";
import ProjectPage from "./pages/ProjectPage";
import SkillDock from "./components/SkillDock";
import SkillPage from "./pages/SkillPage";

// Home layout
function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <About />
      <Contact />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      {/* Background animation */}
      <ScrollArtwork />

      {/* Main navigation stays above content */}
      <div style={{ position: "relative", zIndex: 10002 }}>
        <Navbar />
      </div>

      {/* Content reserves space for the left dock */}
      <div
        className="portfolio-content"
        style={{ position: "relative", zIndex: 2 }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work/:slug" element={<ProjectPage />} />
          <Route path="/skills/:slug" element={<SkillPage />} />
        </Routes>
      </div>

      {/* Permanent floating skill navigation */}
      <SkillDock />
    </BrowserRouter>
  );
}

export default App;
