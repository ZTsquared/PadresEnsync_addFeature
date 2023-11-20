import {useState, useEffect} from "react";
import { Route, Routes, Link } from "react-router-dom";

import React from 'react'

//doesn't work yet

function NavBar({loggedIn, handleLogOut}) {

  return (
    <>
        <nav className="navbar">
        {loggedIn && <ul>
            <li><Link to="/" >Home</Link></li>
            <li><Link to="/Gastos">Gastos</Link></li>
            <li><Link to="/Messages">Messages</Link></li>
        </ul>}
        <ul>
            <li className = "navRightJustify">{loggedIn && `Hi ${localStorage.userName}!`}</li>
            <li className = "navRightJustify">
            {loggedIn && 
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
    </>
  )
}

export default NavBar