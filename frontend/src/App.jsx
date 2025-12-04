import React from 'react'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Services from './components/Services'
import Technologies from './components/Technologies'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <div className="app">
      <Hero />
      <About />
      <Projects />
      <Services />
      <Technologies />
      <Contact />
      <Footer />
    </div>
  )
}

export default App