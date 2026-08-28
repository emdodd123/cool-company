import { Link } from 'react-router-dom'
import logo from '../assets/logo-placeholder.svg'
import NavMenu from './NavMenu.jsx'
import './Header.css'

function Header() {
  return (
    <header className="site-header">
      <Link to="/" className="site-logo">
        <img src={logo} alt="The Cool Company" />
      </Link>
      <NavMenu />
    </header>
  )
}

export default Header
