import { NavLink } from 'react-router-dom'
import './NavMenu.css'

const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'Products', path: '/products' },
  { label: 'About Us', path: '/about-us' },
]

function NavMenu() {
  return (
    <nav className="nav-menu" aria-label="Main navigation">
      <ul>
        {NAV_ITEMS.map((item) => (
          <li key={item.path}>
            <NavLink to={item.path} end={item.path === '/'}>
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default NavMenu
