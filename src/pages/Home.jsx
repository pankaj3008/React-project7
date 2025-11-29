import '../App.css'
import { FiShoppingCart } from "react-icons/fi";
import { FiTrendingDown } from "react-icons/fi";
import { LuLeaf } from "react-icons/lu";
import { useState, useEffect } from 'react';






export function Home() {




    

    let [data,setData] = useState([])
    let [item,setItem] = useState("");

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
    },[])
    

    function handleItem(e){
      setItem(e.target.value);
      console.log(item);

    }

    














  return (
    <div className="page">
      {/* HERO SECTION */}
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

      {/* MAIN GRID */}
      <div className="content">
        {/* LEFT SIDE — SHOPPING LIST */}
        <div className="shopping card">
          <h2>Shopping List</h2>
          {/* <p className="sub">1 of 5 items checked</p> */}

          <div className="add-row">
            {/* <select>
              <option>Meat</option>
              <option>Produce</option>
              <option>Pantry</option>
            </select> */}
            
            <input placeholder="Add new item..."  type="text" name="name" id="name" value={item} onChange={handleItem}/>
<button onClick={() => handleSubmit(item)}>
  ADD
</button>
        </div>
        

          {/* LIST SECTIONS */}
          <div className="list-section">
            <div className="category-tag">Produce</div>
            <div className="item">
              <input type="checkbox" />
              <span>Tomatoes</span>
              <span className="price">$3.99</span>
              <span className="remove">✕</span>
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

