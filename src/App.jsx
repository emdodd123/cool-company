import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Home from './pages/Home.jsx'
import ComingSoon from './pages/ComingSoon.jsx'
import './styles/tokens.css'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ComingSoon title="Products" />} />
        <Route path="/about-us" element={<ComingSoon title="About Us" />} />
      </Routes>
    </>
  )
}

export default App
