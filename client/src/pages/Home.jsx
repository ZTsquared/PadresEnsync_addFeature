import {useState, useEffect} from "react";
import axios from 'axios'


function Home({logIn}) {
  

  // const [userName, setUserName] = useState("");
  // const [password, setPassword] = useState("");
  
  const [credentials, setCredentials] = useState(
    {
      userName : "",
      password : "",
    }
  )

  useEffect((() => (console.log(credentials))), [credentials])

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



  const login = async (e) => {
    e.preventDefault()
    // console.log("trying to log in")
    // axios is like fetch but it does the jason stringify for you and saves the result in the body
    // so in the example below the body of the request contains {data : credentials}
    try {
      const { data } = await axios("/api/auth/login", {
        method: "POST",
        data: credentials,
      });
      //store it locally
      localStorage.setItem("token", data.token);
      console.log(data.message, data.token);
    } catch (error) {
      console.log(error);
    }
    logIn();
  };

  return (
    <div className="home-container">
      <img src="/logo.jpg" alt="Logo" style={{ width: '150px' }} />
      <h1 className="appName">PadresEnSync</h1>
      <form action = "submit"></form>
      <input name = "userName" onChange={handleInputChange} value = {credentials.userName} type="text" className = "inputs" placeholder="User Name"/>
      <input name = "password" onChange={handleInputChange} value = {credentials.password} type="text" className = "inputs" placeholder="Password"/>
      <button type = "submit" onClick={login}>Log In</button>
    </div>
  );
}

export default Home
