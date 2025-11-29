import { NavLink, Route, Routes } from "react-router-dom"
import { Login } from "./pages/Login"
import { Home } from "./pages/Home"
import { Privateroute } from "./components/PrivateRoutes"
import { Register } from "./pages/Register"
import './App.css'

import { Cart } from "./pages/Cart"
import { User } from "./pages/user"


function App() {


  return (
    <>
   
      
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/home" element={<Privateroute> <Home/></Privateroute>}/>
        <Route path="/user" element={<Privateroute> <User/></Privateroute>}/>
        <Route path="/cart" element={<Privateroute><Cart/></Privateroute>}/>
      </Routes>
    </>
  )
}

export default App
