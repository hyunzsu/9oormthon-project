import { Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Home from './pages/Home'
import Map from './pages/Map'
import ChatBot from './pages/ChatBot'

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/map" element={<Map />} />
        <Route path="/chatBot" element={<ChatBot />} />
      </Routes>
    </div>
  )
}

export default App
