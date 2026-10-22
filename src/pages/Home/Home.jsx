import Navbar from "./sections/Navbar/Navbar";
import Hero from "./sections/Hero/Hero";
import About from "./sections/About/About";
import Skills from "./sections/Skills/Skills";
import Projects from "./sections/Projects/Projects";
import Contact from "./sections/Contact/Contact";
import Footer from "./sections/Footer/Footer";
import ThemeToggle from "../../components/ThemeToggle";

function Home() {
  return (
    <>
      <a href="#main" className="skip-link">
        Pular para o conteúdo
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <ThemeToggle />
    </>
  );
}

export default Home;
