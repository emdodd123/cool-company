import homeImage from '../assets/home-placeholder.svg'
import './Home.css'

function Home() {
  return (
    <main className="home">
      <h1>Welcome to The Cool Company</h1>
      <img className="home-image" src={homeImage} alt="A preview of what The Cool Company offers" />
    </main>
  )
}

export default Home
