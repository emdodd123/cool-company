import homeImage from '../assets/home-image.jpg'
import './Home.css'

function Home() {
  return (
    <main className="home">
      <h1>Welcome to The Cool Company</h1>
      <img className="home-image" src={homeImage} alt="A visitor standing in front of the Eiffel Tower" />
    </main>
  )
}

export default Home
