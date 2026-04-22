import { BrowserRouter, Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Projects from "./components/Projects"
import About from "./components/About"
import Contact from "./components/Contact"
import ProjectPage from "./pages/ProjectPage"

// 🔥 Home layout (your current page)
function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <About />
      <Contact />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work/:slug" element={<ProjectPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App