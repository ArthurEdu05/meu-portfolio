import Hero from "./sections/Hero/Hero"
import Navbar from "./sections/Navbar/Navbar"
import Skills from "./sections/Skills/Skills";
import Contact from "./sections/Contact/Contact";
import Footer from "./sections/Footer/Footer";
import About from "./sections/About/About";


function Home() {


  return (
    <>
      <Navbar/>
      <Hero/>
      <About/>
      <Skills/>
      <Contact/>
      <Footer/>
      
    </>
  )
}

export default Home
