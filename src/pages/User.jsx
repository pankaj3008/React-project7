import { useContext } from "react";
import { Navbar } from "../components/Navbar";
import { ThemeContext } from "../components/themeContext";
import { useNavigate } from "react-router-dom";


export function User(){

    let {Logout} = useContext(ThemeContext);
    let navigate = useNavigate();
    
    function handleLogout(){
        Logout();
        navigate("/");
    }


    return(
        <>
        <Navbar/>
        <button onClick={()=>navigate("/home")}>Home</button>
        <h1>User</h1>
        <button onClick={handleLogout}>Logout</button>
        
        </>
    )
}