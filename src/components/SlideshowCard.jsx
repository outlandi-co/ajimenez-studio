import { useEffect, useState, useRef, useCallback } from "react"

export default function SlideshowCard({ project, onClick }) {
  const [index, setIndex] = useState(0)
  const intervalRef = useRef(null)

  const startSlideshow = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % project.images.length)
    }, 2000)
  }, [project.images.length])

  const stopSlideshow = useCallback(() => {
    clearInterval(intervalRef.current)
  }, [])

  useEffect(() => {
    startSlideshow()
    return () => stopSlideshow()
  }, [startSlideshow, stopSlideshow])

  return (
    <div
      className="card"
      onClick={onClick}
      onMouseEnter={stopSlideshow}
      onMouseLeave={startSlideshow}
    >
      <div className="slideshow">
        <img src={project.images[index]} alt={project.title} />
      </div>

      <div className="card-content">
        <h3>{project.title}</h3>
        <p>{project.desc}</p>
      </div>
    </div>
  )
}