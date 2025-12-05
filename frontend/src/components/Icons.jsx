import React from 'react'

export const WebIcon = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="webGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B3FD9" />
        <stop offset="100%" stopColor="#2563EB" />
      </linearGradient>
    </defs>
    <rect x="8" y="12" width="48" height="40" rx="4" stroke="url(#webGradient)" strokeWidth="2.5" fill="none" />
    <line x1="8" y1="24" x2="56" y2="24" stroke="url(#webGradient)" strokeWidth="2" />
    <circle cx="20" cy="18" r="2" fill="url(#webGradient)" />
    <circle cx="28" cy="18" r="2" fill="url(#webGradient)" />
    <circle cx="36" cy="18" r="2" fill="url(#webGradient)" />
    <path d="M16 36 L32 28 L48 36" stroke="url(#webGradient)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <path d="M16 44 L32 36 L48 44" stroke="url(#webGradient)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
  </svg>
)

export const MobileIcon = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="mobileGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B3FD9" />
        <stop offset="100%" stopColor="#2563EB" />
      </linearGradient>
    </defs>
    <rect x="20" y="8" width="24" height="48" rx="4" stroke="url(#mobileGradient)" strokeWidth="2.5" fill="none" />
    <rect x="26" y="12" width="12" height="2" rx="1" fill="url(#mobileGradient)" />
    <circle cx="32" cy="50" r="3" fill="url(#mobileGradient)" />
    <rect x="24" y="18" width="16" height="24" rx="2" stroke="url(#mobileGradient)" strokeWidth="2" fill="none" />
    <line x1="28" y1="22" x2="36" y2="22" stroke="url(#mobileGradient)" strokeWidth="1.5" />
    <line x1="28" y1="26" x2="36" y2="26" stroke="url(#mobileGradient)" strokeWidth="1.5" />
  </svg>
)

export const ApiIcon = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="apiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B3FD9" />
        <stop offset="100%" stopColor="#2563EB" />
      </linearGradient>
    </defs>
    <rect x="12" y="16" width="40" height="32" rx="3" stroke="url(#apiGradient)" strokeWidth="2.5" fill="none" />
    <path d="M20 24 L32 20 L44 24" stroke="url(#apiGradient)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <path d="M20 32 L32 28 L44 32" stroke="url(#apiGradient)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <path d="M20 40 L32 36 L44 40" stroke="url(#apiGradient)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <circle cx="20" cy="24" r="2" fill="url(#apiGradient)" />
    <circle cx="44" cy="24" r="2" fill="url(#apiGradient)" />
    <circle cx="20" cy="32" r="2" fill="url(#apiGradient)" />
    <circle cx="44" cy="32" r="2" fill="url(#apiGradient)" />
    <circle cx="20" cy="40" r="2" fill="url(#apiGradient)" />
    <circle cx="44" cy="40" r="2" fill="url(#apiGradient)" />
  </svg>
)

export const DatabaseIcon = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="dbGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B3FD9" />
        <stop offset="100%" stopColor="#2563EB" />
      </linearGradient>
    </defs>
    <ellipse cx="32" cy="16" rx="20" ry="6" stroke="url(#dbGradient)" strokeWidth="2.5" fill="none" />
    <ellipse cx="32" cy="32" rx="20" ry="6" stroke="url(#dbGradient)" strokeWidth="2.5" fill="none" />
    <ellipse cx="32" cy="48" rx="20" ry="6" stroke="url(#dbGradient)" strokeWidth="2.5" fill="none" />
    <line x1="12" y1="16" x2="12" y2="48" stroke="url(#dbGradient)" strokeWidth="2.5" />
    <line x1="52" y1="16" x2="52" y2="48" stroke="url(#dbGradient)" strokeWidth="2.5" />
    <circle cx="32" cy="24" r="3" fill="url(#dbGradient)" />
    <circle cx="32" cy="40" r="3" fill="url(#dbGradient)" />
  </svg>
)

export const CloudIcon = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="cloudGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B3FD9" />
        <stop offset="100%" stopColor="#2563EB" />
      </linearGradient>
    </defs>
    <path d="M44 24 C48 24 52 28 52 32 C52 36 48 40 44 40 L20 40 C16 40 12 36 12 32 C12 28 16 24 20 24 C20 20 24 16 28 16 C32 16 36 20 36 24 C40 24 44 24 44 24 Z" 
          stroke="url(#cloudGradient)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="28" cy="28" r="2" fill="url(#cloudGradient)" />
    <circle cx="36" cy="28" r="2" fill="url(#cloudGradient)" />
    <circle cx="32" cy="32" r="2" fill="url(#cloudGradient)" />
    <path d="M24 36 L40 36" stroke="url(#cloudGradient)" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

export const DesignIcon = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="designGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B3FD9" />
        <stop offset="100%" stopColor="#2563EB" />
      </linearGradient>
    </defs>
    <rect x="16" y="16" width="32" height="32" rx="2" stroke="url(#designGradient)" strokeWidth="2.5" fill="none" />
    <path d="M24 24 L32 20 L40 24" stroke="url(#designGradient)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <path d="M24 32 L32 28 L40 32" stroke="url(#designGradient)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <path d="M24 40 L32 36 L40 40" stroke="url(#designGradient)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <circle cx="28" cy="24" r="2" fill="url(#designGradient)" />
    <circle cx="36" cy="24" r="2" fill="url(#designGradient)" />
  </svg>
)

export const InnovationIcon = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="innovationGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B3FD9" />
        <stop offset="100%" stopColor="#2563EB" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="16" stroke="url(#innovationGradient)" strokeWidth="2.5" fill="none" />
    <path d="M32 16 L32 20 M32 44 L32 48 M16 32 L20 32 M44 32 L48 32" 
          stroke="url(#innovationGradient)" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M24 24 L26 26 M40 24 L38 26 M24 40 L26 38 M40 40 L38 38" 
          stroke="url(#innovationGradient)" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="32" cy="32" r="4" fill="url(#innovationGradient)" />
    <path d="M28 28 L36 36 M36 28 L28 36" stroke="url(#innovationGradient)" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

export const TargetIcon = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="targetGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B3FD9" />
        <stop offset="100%" stopColor="#2563EB" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="20" stroke="url(#targetGradient)" strokeWidth="2.5" fill="none" />
    <circle cx="32" cy="32" r="12" stroke="url(#targetGradient)" strokeWidth="2.5" fill="none" />
    <circle cx="32" cy="32" r="4" fill="url(#targetGradient)" />
    <path d="M32 12 L32 20 M32 44 L32 52 M12 32 L20 32 M44 32 L52 32" 
          stroke="url(#targetGradient)" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
)

export const RocketIcon = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="rocketGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B3FD9" />
        <stop offset="100%" stopColor="#2563EB" />
      </linearGradient>
    </defs>
    <path d="M32 12 L28 20 L20 24 L16 32 L20 40 L28 44 L32 52 L36 44 L44 40 L48 32 L44 24 L36 20 Z" 
          stroke="url(#rocketGradient)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="32" cy="32" r="6" fill="url(#rocketGradient)" />
    <path d="M32 20 L32 12 M32 44 L32 52" stroke="url(#rocketGradient)" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M20 32 L12 32 M44 32 L52 32" stroke="url(#rocketGradient)" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
)

export const EmailIcon = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="emailGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B3FD9" />
        <stop offset="100%" stopColor="#2563EB" />
      </linearGradient>
    </defs>
    <rect x="12" y="16" width="40" height="32" rx="3" stroke="url(#emailGradient)" strokeWidth="2.5" fill="none" />
    <path d="M12 20 L32 36 L52 20" stroke="url(#emailGradient)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="20" y1="28" x2="12" y2="40" stroke="url(#emailGradient)" strokeWidth="2" strokeLinecap="round" />
    <line x1="44" y1="28" x2="52" y2="40" stroke="url(#emailGradient)" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

export const PhoneIcon = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="phoneGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B3FD9" />
        <stop offset="100%" stopColor="#2563EB" />
      </linearGradient>
    </defs>
    <rect x="18" y="10" width="28" height="44" rx="4" stroke="url(#phoneGradient)" strokeWidth="2.5" fill="none" />
    <rect x="24" y="14" width="16" height="2" rx="1" fill="url(#phoneGradient)" />
    <circle cx="32" cy="52" r="3" fill="url(#phoneGradient)" />
    <rect x="22" y="20" width="20" height="28" rx="2" stroke="url(#phoneGradient)" strokeWidth="2" fill="none" />
    <circle cx="28" cy="28" r="1.5" fill="url(#phoneGradient)" />
    <circle cx="32" cy="28" r="1.5" fill="url(#phoneGradient)" />
    <circle cx="36" cy="28" r="1.5" fill="url(#phoneGradient)" />
  </svg>
)

export const LocationIcon = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="locationGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B3FD9" />
        <stop offset="100%" stopColor="#2563EB" />
      </linearGradient>
    </defs>
    <path d="M32 12 C24 12 18 20 18 28 C18 36 32 52 32 52 C32 52 46 36 46 28 C46 20 40 12 32 12 Z" 
          stroke="url(#locationGradient)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="32" cy="28" r="6" stroke="url(#locationGradient)" strokeWidth="2.5" fill="none" />
    <circle cx="32" cy="28" r="3" fill="url(#locationGradient)" />
  </svg>
)

