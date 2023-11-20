// Importación de componentes y estilos
import {useState, useEffect} from "react";
import { Route, Routes, Link } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import Home from "./pages/Home.jsx";
import Gastos from "./pages/Gastos.jsx";
import NoPage from "./pages/NoPage.jsx";
import ZoomGastos from "./components/ZoomGasto.jsx";
import Messages from "./pages/Messages.jsx";
import axios from "axios";




import './App.css'
import MessagesByPartner from "./components/MessagesByPartner.jsx";

function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));

  function handleLogin () {
    setLoggedIn(true)
  }

  function handleLogOut () {
    setLoggedIn(false);
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
  }
  
  return (
    <>
    <NavBar loggedIn = {loggedIn} handleLogOut = {handleLogOut}/>    
    <Routes>
      <Route path="/" element={<Home logIn = {handleLogin} loggedIn = {loggedIn} />} />
      <Route path="/Gastos" element={<Gastos loggedIn = {loggedIn}/>}>
        <Route path='/Gastos/:id' element={<ZoomGastos />} /> 
      </Route>
      <Route path="/Messages"  element={<Messages loggedIn = {loggedIn} />}>
        <Route path = ":partnerID" element={<MessagesByPartner/>}></Route>
      </Route>
      <Route path="*" element={<NoPage />} />
    </Routes>
    
    </>
  )
}


export default App
