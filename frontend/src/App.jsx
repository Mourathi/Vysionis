import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Services from './components/Services'
import Technologies from './components/Technologies'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import ScrollAnimation from './components/ScrollAnimation'
import './App.css'

function App() {
  return (
    <div className="app">
      <ScrollProgress />
      <Header />
      <Hero />
      
      <ScrollAnimation delay={0} variant="left">
        <About />
      </ScrollAnimation>

      <ScrollAnimation delay={100} variant="right">
        <Projects />
      </ScrollAnimation>

      <ScrollAnimation delay={200} variant="left">
        <Services />
      </ScrollAnimation>

      <ScrollAnimation delay={300} variant="right">
        <Technologies />
      </ScrollAnimation>

      <ScrollAnimation delay={400} variant="left">
        <Contact />
      </ScrollAnimation>

      <ScrollAnimation delay={500} variant="right">
        <Footer />
      </ScrollAnimation>
    </div>
  )
}

export default App