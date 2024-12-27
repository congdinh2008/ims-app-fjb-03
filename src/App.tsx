import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/customer/Home'
import About from './pages/customer/About'
import Contact from './pages/customer/Contact'
import Layout from './shared/layouts/Layout'
import AnonymousLayout from './shared/layouts/AnonymousLayout'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import ManagerLayout from './shared/layouts/ManagerLayout'
import Dashboard from './pages/manager/Dashboard'
import AmenityList from './pages/manager/amenities/AmenityList'
import RoomList from './pages/manager/rooms/RoomList'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Customer Page */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />

        {/* Manager Page */}
        <Route path="/manager/dashboard" element={<ManagerLayout><Dashboard /></ManagerLayout>} />
        <Route path="/manager/amenities" element={<ManagerLayout><AmenityList /></ManagerLayout>} />
        <Route path="/manager/rooms" element={<ManagerLayout><RoomList /></ManagerLayout>} />

        {/* Auth Page */}
        <Route path="/auth/login" element={<AnonymousLayout><Login /></AnonymousLayout>} />
        <Route path="/auth/register" element={<AnonymousLayout><Register /></AnonymousLayout>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
