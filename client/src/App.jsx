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

  useEffect((() => {console.log(loggedIn)}),[loggedIn])

  function handleLogin () {
    setLoggedIn(true)
  }

  // const login = async () => {
  //   // axios is like fetch but it does the jason stringify for you and saves the result in the body
  //   // so in the example below the body of the request contains {data : credentials}
  //   try {
  //     const { data } = await axios("/api/auth/login", {
  //       method: "POST",
  //       data: credentials,
  //     });
  
  //     //store it locally
  //     localStorage.setItem("token", data.token);
  //     console.log(data.message, data.token);
  //     setLoggedIn(true)
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  
  return (
    <>
    
    <nav className="navbar">
      <ul>
        <li><Link to="/" >Home</Link></li>
        <li><Link to="/Gastos">Gastos</Link></li>
     </ul>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
         rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" 
         crossOrigin="anonymous"></link>
    </nav>
    
    <Routes>
      <Route path="/" element={<Home logIn = {handleLogin} />} />
      <Route path="/Gastos" element={<Gastos />}>
           <Route path='/Gastos/:id' element={<ZoomGastos />} /> 
     </Route>



      <Route path="*" element={<NoPage />} />
    </Routes>
    
    </>
  )
}


export default App
