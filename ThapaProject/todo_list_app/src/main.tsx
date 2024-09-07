import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { TodosProvider } from './Store/Todos';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
    <TodosProvider>
    <App />
    </TodosProvider>
    </Router>
  </StrictMode>,
)
