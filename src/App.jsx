import { useState } from "react"
import Splash from "./components/Splash"

import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Projects from "./components/Projects"
import About from "./components/About"
import Contact from "./components/Contact"

function App() {
  const [showSplash, setShowSplash] = useState(true)

  return (
    <>
      {showSplash && <Splash onFinish={() => setShowSplash(false)} />}

      {!showSplash && (
        <>
          <Navbar />
          <Hero />
          <Projects />
          <About />
          <Contact />
        </>
      )}
    </>
  )
}

export default App
