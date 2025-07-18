import Hero from "./sections/Hero/Hero"
import Navbar from "./sections/Navbar/Navbar"
import Skills from "./sections/Skills/Skills";
import Contact from "./sections/Contact/Contact";
import Footer from "./sections/Footer/Footer";

function Home() {


  return (
    <>
      <Navbar/>
      <Hero/>
      <Skills/>
      <Contact/>
      <Footer/>
    </>
  )
}

export default Home
