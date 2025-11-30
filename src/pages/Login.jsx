import {  useContext, useState } from "react";
import { ThemeContext } from "../components/themeContext";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchFailed, fetchLoading, fetchSuccess } from "../redux/action";
import Loader from "../components/Loader";
import '../App.css'




export function Login(){ 

    let dispatch = useDispatch();

    let navigate = useNavigate();

    let loading = useSelector((state)=>state.loading);
    let error = useSelector((state)=>state.error);


    let [formData, setFormData] = useState({email:"",password:""});

    let {fetchData} = useContext(ThemeContext);

    async function handleSubmit(e){
        e.preventDefault();
        console.log(formData);

        dispatch(fetchLoading());

        let obj = await fetchData(formData);
       if (obj?.success) {
    dispatch(fetchSuccess());


    let usersRes = await fetch("https://grocery-user-9cccc-default-rtdb.firebaseio.com/users.json");
    let users = await usersRes.json();

    let foundUserId = null;
    let foundListID = null;


    for (let uid in users) {
      if (users[uid].email === formData.email &&
          users[uid].password === formData.password) {
        
        foundUserId = uid;              
        foundListID = users[uid].listID;   
        break;
      }
    }


    localStorage.setItem("userId", foundUserId);
    localStorage.setItem("listID", foundListID);

    navigate("/home");
}
else{
            dispatch(fetchFailed("Invalid Email or Password"));
            alert("User not found");
        }
    }

    


return (
  <>
    <div className="loader-center">
      {loading && <Loader />}
    </div>

    {!loading && (
      <div className="login-container">
        <h1>Login</h1>

        <form className="login-form" onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <input
              type="email"
              onChange={(e)=>setFormData({...formData, email:e.target.value})}
              required
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              onChange={(e)=>setFormData({...formData, password:e.target.value})}
              required
            />
          </div>

          <input type="submit" value="Submit" />
        </form>

        <div className="register-row">
          Don't have an account?
          <button onClick={()=>navigate("/register")}> Register</button>
        </div>
      </div>
    )}

    {error && <div className="login-error">{error}</div>}
  </>
);

    
    
} 