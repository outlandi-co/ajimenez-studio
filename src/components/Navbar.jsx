import logo from "../assets/ajimenezstudio.png"

export default function Navbar() {
  return (
    <nav className="navbar">
      <a href="#top" className="logo-link">
        <img src={logo} alt="AJimenez Studio Logo" className="logo-img" />
      </a>

      <div className="nav-links">
        <a href="#projects">Work</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  )
}