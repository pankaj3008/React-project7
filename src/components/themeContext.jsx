import { createContext, useState } from "react"



export let ThemeContext = createContext();

export function ThemeContextProvider({children}){

    let savedUser = localStorage.getItem("user");
    let [user, setUser] = useState(savedUser ? JSON.parse(savedUser) : null);

    
    function Logout(){
        setUser(null);
        localStorage.removeItem("user");
       
    }

    async function fetchData(obj){
        try{
            let data = await fetch("https://grocery-user-9cccc-default-rtdb.firebaseio.com/users.json")

            let res = await data.json();
            let final = Object.values(res);

            console.log("ThemeContext" , final);
            console.log(obj);

            let user1 = final.find((v)=>v.password == obj.password  && v.email == obj.email)
            console.log("Logged user" , user1);
            if(user1){
                setUser(user1);

                localStorage.setItem("user",JSON.stringify(user1));

                alert("Login Successfully");
                return {success:true,Message:"Login Successfully"}

            }else{
                return {success:false,message:"User not found"}
            }

        }catch(e){
                console.log(e,message);
            }
    }


    return (
        <>
        <ThemeContext.Provider value={{user,fetchData,Logout}}>
            {children}
        </ThemeContext.Provider>
        
        </>
    )
}