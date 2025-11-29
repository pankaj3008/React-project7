import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";


export function Cart(){

    let navigate = useNavigate();

    return(
        <>
        <Navbar/>
        <button onClick={()=>navigate("/home")}>Home</button>
        <h1>Cart</h1>
        
        </>
    )
}