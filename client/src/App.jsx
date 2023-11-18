// Importación de componentes y estilos
import {useState, useEffect} from "react";
import { Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Gastos from "./pages/Gastos.jsx";
import NoPage from "./pages/NoPage.jsx";
import ZoomGastos from "./components/ZoomGasto.jsx";
import axios from "axios";




import './App.css'

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setuserName] = useState("");

  // useEffect((() => {setUserName(getUserName)}),[loggedIn])

  function handleLogin (userName) {
    setLoggedIn(true)
    setuserName(userName) //get this from where? the home page?
  }

  function handleLogOut () {
    setLoggedIn(false);
    setuserName("");
    localStorage.removeItem("token");
  }

  
  return (
    <>
    
    <nav className="navbar">
      <ul>
        <li><Link to="/" >Home</Link></li>
        <li><Link to="/Gastos">Gastos</Link></li>
     </ul>
     <ul className = "navRightJustify">
        <li className = "navRightJustify">{loggedIn && `Hi ${userName}!`}</li>
        <li>
          {loggedIn && 
            // <button>Log Out</button>
            <button className="btn btn-outline-secondary btn-sm"
                onClick={handleLogOut}>Log Out
              </button> 
          }
        </li>
     </ul>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
         rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" 
         crossOrigin="anonymous"></link>
    </nav>
    
    <Routes>
      {/* i am not receiving the username correctly yet... */}
      <Route path="/" element={<Home logIn = {(userNameInbound) => handleLogin(userNameInbound)} loggedIn = {loggedIn} />} />
      <Route path="/Gastos" element={<Gastos />}>
           <Route path='/Gastos/:id' element={<ZoomGastos />} /> 
     </Route>



      <Route path="*" element={<NoPage />} />
    </Routes>
    
    </>
  )
}


export default App
