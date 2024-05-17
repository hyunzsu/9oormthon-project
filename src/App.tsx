import { Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Home from './pages/Home'
import Map from './pages/Map'

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </div>
  )
}

export default App
