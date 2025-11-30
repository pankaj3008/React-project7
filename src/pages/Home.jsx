import '../App.css'
import { FiShoppingCart } from "react-icons/fi";
import { FiTrendingDown } from "react-icons/fi";
import { LuLeaf } from "react-icons/lu";
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaUserAlt } from "react-icons/fa";







export function Home() {




    

    let [data,setData] = useState([])
    let [item,setItem] = useState("");
let [shoppingList, setShoppingList] = useState([]);

let listID = localStorage.getItem("listID");


async function fetchListItems() {
  if (!listID) return;

  try {
    let res = await fetch(
      `https://grocery-user-9cccc-default-rtdb.firebaseio.com/lists/${listID}/items.json`
    );

    let data = await res.json();

    if (data) {
    
      setShoppingList(Object.entries(data));
    } else {
      setShoppingList([]); 
    }

  } catch (error) {
    console.log("Error fetching list items:", error);
  }
}




    async function fetchData(){

        try{
            let res = await fetch("https://groceryitems-19409-default-rtdb.firebaseio.com/products.json");
            let final = await res.json();

            setData(Object.entries(final));
            console.log(Object.entries(final));

            

        }catch(e){
            console.log(e.message);

        }


    }

   


    useEffect(()=>{
        fetchData();
        fetchListItems();
    },[])
    

    function handleItem(e){
      setItem(e.target.value);
      console.log(item);
    }


    function findCategory(name){
      let itemName = name.toLowerCase();

      for(let [key, value] of data){
        let apiName = value.name.toLowerCase();


        if(apiName == itemName){
          // console.log(key);
          return key;
        }
      }

      return "other";
    }


    async function addItemToList(listId, itemData){

 if (!listId) {
    console.error("List ID missing!");
    return;
  }


      let obj ={
        method: "POST",
        body: JSON.stringify(itemData),
        headers: { "Content-Type": "application/json" }
      }
    await fetch(`https://grocery-user-9cccc-default-rtdb.firebaseio.com/lists/${listId}/items.json`,obj);


    fetchListItems();
  }



    function handleSubmit(e,item){

      
  e.preventDefault();  

      
      if (item == ""){
        alert("please enter item name")
        return;
      }
      let key = findCategory(item);
      console.log("category:" , data[key])
      if(key == "other"){
        alert("Item not found");
        return;
      }
      

        console.log(data[key][1].name);
        console.log(data[key][1].category);

        let newItem = {
          name: data[key][1].name,
          category: data[key][1].category,
          unit: data[key][1].unit,
          price : data[key][1].price,

        }
addItemToList(listID, newItem);





      setItem("");
      

    }

    async function DeleteData(itemkey){

      await fetch(`https://grocery-user-9cccc-default-rtdb.firebaseio.com/lists/${listID}/items/${itemkey}.json`,{method:"DELETE"});
      alert("Item Deletes Successfully")
      fetchListItems();

    }





  return (
    <div className="page">
     
      <div className="hero">
        <h1>Smart Grocery Shopping Made Simple</h1>
        <p>
          Organize your shopping lists, discover recipes, track your pantry, and
          reduce waste—all in one place.
        </p>

        <div className="hero-features">
          <div className="feature">
            <div className="f-icon"><FiShoppingCart /></div>
            <div>
              <p className="f-title">Smart Lists</p>
              <p className="f-sub">Auto-organized by category</p>
            </div>
          </div>

          <div className="feature">
            <div className="f-icon"><FiTrendingDown /></div>
            <div>
              <p className="f-title">Budget Tracking</p>
              <p className="f-sub">Stay within your limits</p>
            </div>
          </div>

          <div className="feature">
            <div className="f-icon"><LuLeaf /></div>
            <div>
              <p className="f-title">Reduce Waste</p>
              <p className="f-sub">Track expiration dates</p>
            </div>
          </div>
        </div>
      </div>

      
      <div className="content">
        
        <div className="shopping card">
          <h2>Shopping List</h2>
          

                        
          <div className="add-row">
    <form onSubmit={(e)=>handleSubmit(e, item)}>
  <input 
    placeholder="Add new item..."
    type="text"
    name="name"
    id="name" 
    value={item}
    onChange={handleItem}
  />

  <button style={{width:"100px",fontWeight:"600",color:"#ffffff", margin:"10px" , height:"40px", padding:"3px" , borderRadius:"10px", backgroundColor:"#47dc11ff" , border:"0"}} type="submit">ADD</button>
</form>
<div style={{ height:"55px" , width:"55px" , display:"flex" , justifyContent:"center" , alignItems:"center"}}>

<NavLink 
                            to="/user"
                            style={{
                              textDecoration: "none",
                              color: "#3848f6ff",
                              fontSize: "30px",
                              fontWeight: "500",
                              
                            }}
                            >
                            <FaUserAlt />
                        </NavLink>
                          </div>
            {/* <select>
              <option>Meat</option>
              <option>Produce</option>
              <option>Pantry</option>
            </select> */}
            
            {/* <input placeholder="Add new item..."  type="text" name="name" id="name" value={item} onChange={handleItem}/>
<button onClick={(e) => handleSubmit(e,item)}>
  ADD
</button> */}
        </div>
        

          {/* LIST SECTIONS */}
          {/* <div className="list-section">
            <div className="category-tag">Produce</div>
            <div className="item">
              <input type="checkbox" />
              <span>Tomatoes</span>
              <span className="price">$3.99</span>
              <span className="remove">✕</span>
            </div>
          </div> */}


          <div className="list-section">
  <div className="category-tag">Products</div>

  {shoppingList.map((v, i) => (
    <div className="item" key={i}>
       <div className="category-tag">{v[1].category}</div>
      <input type="checkbox" />
      <span>{v[1].name}</span>
      <span className="price">${v[1].price}</span>
      <button style={{width:"40px" , height:"40px" , display:"flex" , alignItems:"center" , padding:"3px" , borderRadius:"10px", backgroundColor:"#ec2f2fff" , border:"0"}} onClick={() => DeleteData(v[0])}><span style={{color:"#ffffff" , fontWeight:"900"}} className="remove">✕</span></button>
    </div>
  ))}
  <div>
  
  <h2><strong>Total: {shoppingList.reduce((a,b)=>a+b[1].price,0)}</strong></h2>
  </div>
</div>


          
        </div>

        {/* RIGHT SIDE — PANTRY + RECIPES */}
        <div className="right-column">
          {/* PANTRY */}
          <div className="pantry card">
            <h2>Pantry</h2>
            <p className="sub">6 items in stock</p>

            <div className="pantry-grid">
              <div className="p-item">Rice <span className="p-sub">2 kg</span></div>
              <div className="p-item">Olive Oil <span className="p-sub">1 bottle</span></div>
              <div className="p-item">Canned Tomatoes <span className="p-sub">4 cans</span></div>
              <div className="p-item exp">Eggs <span className="badge orange">5d</span></div>
              <div className="p-item exp-red">Cheese <span className="badge red">3d</span></div>
              <div className="p-item">Flour <span className="p-sub">1 kg</span></div>
            </div>
          </div>

          {/* RECIPE IDEAS */}
          <div className="recipes card">
            <h2>Recipe Ideas</h2>
            <p className="sub">Based on your ingredients</p>

            <div className="recipe-card">
              <div className="r-img">🍝</div>
              <div className="r-info">
                <h3>Tomato Pasta</h3>
                <div className="badges">
                  <span className="badge orange">20 min</span>
                  <span className="badge orange">4 ingredients</span>
                  <span className="badge light">Easy</span>
                </div>
                <p>3/5 ingredients available</p>
              </div>
              <button className="view-btn">View Recipe</button>
            </div>

            <div className="recipe-card">
              <div className="r-img">🥗</div>
              <div className="r-info">
                <h3>Chicken Salad</h3>
                <div className="badges">
                  <span className="badge orange">15 min</span>
                  <span className="badge orange">2 ingredients</span>
                  <span className="badge light">Easy</span>
                </div>
                <p>2/6 ingredients available</p>
              </div>
              <button className="view-btn">View Recipe</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

