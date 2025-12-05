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
      
      <ScrollAnimation delay={0}>
        <About />
      </ScrollAnimation>
      
      <ScrollAnimation delay={100}>
        <Projects />
      </ScrollAnimation>
      
      <ScrollAnimation delay={200}>
        <Services />
      </ScrollAnimation>
      
      <ScrollAnimation delay={300}>
        <Technologies />
      </ScrollAnimation>
      
      <ScrollAnimation delay={400}>
        <Contact />
      </ScrollAnimation>
      
      <ScrollAnimation delay={500}>
        <Footer />
      </ScrollAnimation>
    </div>
  )
}

export default App