import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { MovieProvider } from './contexts/MovieContext.tsx'
import { trackVisitor } from './services/visitor.ts'

// Track anonymous visitor (fire and forget, won't block app)
trackVisitor();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MovieProvider>
      <App />
    </MovieProvider>
  </StrictMode>,
)