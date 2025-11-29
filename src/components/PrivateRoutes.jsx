import { useContext } from "react";
import { ThemeContext } from "./themeContext";
import {Navigate} from 'react-router-dom';


export function Privateroute({children}){
    let {user}= useContext(ThemeContext)
    console.log(user, "users in private routes")
    return user ? children : <Navigate to="/" />
}