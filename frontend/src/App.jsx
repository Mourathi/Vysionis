import React, { Suspense, lazy } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import ScrollProgress from './components/ScrollProgress'
import LazySection from './components/LazySection'
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
      
      <LazySection fallback={<LoadingSpinner />}>
        <Suspense fallback={<LoadingSpinner />}>
          <About />
        </Suspense>
      </LazySection>
      
      <LazySection fallback={<LoadingSpinner />}>
        <Suspense fallback={<LoadingSpinner />}>
          <Projects />
        </Suspense>
      </LazySection>
      
      <LazySection fallback={<LoadingSpinner />}>
        <Suspense fallback={<LoadingSpinner />}>
          <Services />
        </Suspense>
      </LazySection>
      
      <LazySection fallback={<LoadingSpinner />}>
        <Suspense fallback={<LoadingSpinner />}>
          <Technologies />
        </Suspense>
      </LazySection>
      
      <LazySection fallback={<LoadingSpinner />}>
        <Suspense fallback={<LoadingSpinner />}>
          <Contact />
        </Suspense>
      </LazySection>
      
      <LazySection fallback={<LoadingSpinner />}>
        <Suspense fallback={<LoadingSpinner />}>
          <Footer />
        </Suspense>
      </LazySection>
    </div>
  )
}

export default App