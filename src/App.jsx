import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import ErrorPage from './pages/ErrorPage'
import Home from './pages/Home'
import Species from './pages/Species'
import './App.css'

function App() {
  return (
    <>
      <Navbar />
      <main className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/species" element={<Species />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
    </>
  )
}

export default App
