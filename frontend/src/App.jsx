import React, { lazy } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import ScrollProgress from './components/ScrollProgress'
import LazyWrapper from './components/LazyWrapper'
import LoadingSpinner from './components/LoadingSpinner'
import './App.css'

// Lazy loading dos componentes - code splitting
const About = lazy(() => import('./components/About'))
const Projects = lazy(() => import('./components/Projects'))
const Services = lazy(() => import('./components/Services'))
const Technologies = lazy(() => import('./components/Technologies'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))

function App() {
  return (
    <div className="app">
      <ScrollProgress />
      <Header />
      <Hero />
      
      <LazyWrapper fallback={<LoadingSpinner />}>
        <About />
      </LazyWrapper>
      
      <LazyWrapper fallback={<LoadingSpinner />}>
        <Projects />
      </LazyWrapper>
      
      <LazyWrapper fallback={<LoadingSpinner />}>
        <Services />
      </LazyWrapper>
      
      <LazyWrapper fallback={<LoadingSpinner />}>
        <Technologies />
      </LazyWrapper>
      
      <LazyWrapper fallback={<LoadingSpinner />}>
        <Contact />
      </LazyWrapper>
      
      <LazyWrapper fallback={<LoadingSpinner />}>
        <Footer />
      </LazyWrapper>
    </div>
  )
}

export default App