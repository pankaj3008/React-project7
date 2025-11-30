import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchFailed, fetchLoading, fetchSuccess } from "../redux/action";
import Loader from "../components/Loader";


export function Register(){

    let dispatch = useDispatch();

    let loading = useSelector((state)=>state.loading);
    let error = useSelector((state)=>state.error);


    let [user,setUser] = useState({diet:"veg",email:"" , name:"" ,  password:""});
    
    let navigate = useNavigate();


    
    function handleChange(e){
        let {name,value} = e.target;
        console.log(name,value);

        setUser({...user, [name]:value});
    }

    async function handleSubmit(e){
        e.preventDefault();

        dispatch(fetchLoading());

       

        try{
            let fetchdData = await fetch("https://grocery-user-9cccc-default-rtdb.firebaseio.com/users.json");
            let allData = await fetchdData.json();
            let all = allData ? Object.values(allData) : [];

            if(all.find((v)=>v.email == user.email)){
                dispatch(fetchFailed("Email already exists"));
                alert("User already has an account with this email.");
                return;
            }

             let obj={
            method : "POST",
            body:JSON.stringify(user),
        }

            let res = await fetch(`https://grocery-user-9cccc-default-rtdb.firebaseio.com/users.json`,obj);

            let data = await res.json();
            dispatch(fetchSuccess());
            console.log(data);


  let newList = {
  owner: data.name,  
  items: {},
  sharedWith: {}
};



let listRes = await fetch(
  `https://grocery-user-9cccc-default-rtdb.firebaseio.com/lists.json`,
  {
    method: "POST",
    body: JSON.stringify(newList),
    headers: { "Content-Type": "application/json" }
  }
);

let listData = await listRes.json(); 
let listID = listData.name; 

await fetch(
  `https://grocery-user-9cccc-default-rtdb.firebaseio.com/users/${data.name}.json`,
  {
    method: "PATCH",
    body: JSON.stringify({ listID })
  }
);

console.log("New ListID created:", listID);


            alert("User Created Successfully");
            setUser({diet:"veg",email:"" , name:"" , password:""})
            navigate("/");

        }catch(e){
            dispatch(fetchFailed(e.message));
            alert("Something went wrong!");
        }

    }

    return (
  <>
    <div className="loader-center">
      {loading && <Loader />}
    </div>

    {!loading && (
      <div className="register-container">
        <h1>Register</h1>

        <form className="register-form" onSubmit={handleSubmit}>

          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Submit</button>
        </form>

        <div className="login-row">
          Already have an account?
          <button onClick={() => navigate("/")}> Login</button>
        </div>
      </div>
    )}

    {error && <p className="register-error">{error}</p>}
  </>
);

}