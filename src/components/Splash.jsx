// import { useEffect } from "react"

// export default function Splash({ onFinish }) {

//   useEffect(() => {
//     const alreadyVisited = localStorage.getItem("visited")

//     if (alreadyVisited) {
//       onFinish()
//       return
//     }

//     const timer = setTimeout(() => {
//       localStorage.setItem("visited", "true")
//       onFinish()
//     }, 4000) // match your video length

//     return () => clearTimeout(timer)
//   }, [onFinish])

//   return (
//     <div className="splash">
//       <video autoPlay muted playsInline className="splash-video">
//         <source src="/videos/intro.mp4" type="video/mp4" />
//       </video>
//     </div>
//   )
// }