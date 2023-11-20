import {useState, useEffect} from "react";
import axios from 'axios'
import './Home.css'


function Home({logIn, loggedIn}) {
  

  // const [userName, setUserName] = useState("");
  // const [password, setPassword] = useState("");
  
  const [credentials, setCredentials] = useState(
    {
      userName : "",
      password : "",
    }
  )
  const [logginError, setLogginError] = useState(false)

  useEffect((
    () => setCredentials(
      {
        userName : "",
        password : "",
      }
    )
  ), [loggedIn])
  // useEffect((() => (console.log(credentials))), [credentials])
  useEffect((() => (setLogginError(false))), [credentials])

  function handleInputChange (e) {
    const {name, value} = e.target
    setCredentials(
      (currentState) => (
        {
          ...currentState,
          [name] : value,
        }
      )
    )
  }



  const authenticate = async (e) => {
    e.preventDefault()
    // console.log("trying to log in")
    // axios is like fetch but it does the jason stringify for you and saves the result in the body
    // so in the example below the body of the request contains {data : credentials}
    try {
      const { data } = await axios("/api/auth/login", {
          method: "POST",
          data: credentials,
        }
      );
      // console.log(data);
      if (!data.token) {
        setLogginError(true)
      } else {
        logIn(credentials.userName);
        localStorage.setItem("token", data.token);
        localStorage.setItem("userName", credentials.userName);
        localStorage.setItem("user_id", data.user_id);
        setLogginError(false)
      }
      //store it locally
      // console.log(data.message, data.token);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="home-container">
      <img src="/logo.jpg" alt="Logo" style={{ width: '150px' }} />
      <h1 className="appName">PadresEnSync</h1>
      {!loggedIn &&
        <form action = "submit" className="login-form">
          <input name = "userName" onChange={handleInputChange} value = {credentials.userName} type="text" className = "inputs" placeholder="User Name"/>
          <input name = "password" onChange={handleInputChange} value = {credentials.password} type="text" className = "inputs" placeholder="Password"/>
          <button type = "submit" onClick={authenticate} className="btn btn-outline-secondary btn-sm" disabled = {!credentials.userName || !credentials.password}>Log In</button>
          {logginError && <div>Username or Password incorrect</div>}
        </form>
      }
    </div>
  );
}

export default Home


