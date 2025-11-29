import { NavLink } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { IoBagHandle } from "react-icons/io5";

export function Navbar() {

    return (
        <>
            <nav 
                style={{
                    background: "#4caf4fff",
                    padding: "20px 50px",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                    position: "sticky",
                    top: 0,
                    zIndex: 100,
                    
                    
                }}
            >
                <div 
                    style={{
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                        gap: "20px",
                        // maxWidth: "1200px",
                        margin: "auto",
                    }}
                >

                    
                    <div>
                        <h1 
                            style={{
                                margin: 0,
                                fontSize: "32px",
                                fontWeight: "900",
                                color: "#243f25ff",
                                fontFamily: "Poppins, sans-serif",
                            }}
                        >
                            YourNeed
                        </h1>
                    </div>

                            <div style={{ width: "55%" }}>
                        <input
                            style={{
                                padding: "10px 12px",
                                width: "100%",
                                border: "1px solid #ccc",
                                borderRadius: "50px",
                                fontSize: "16px",
                                outline: "none",
                                transition: "0.3s",
                            }}
                            onFocus={(e) => e.target.style.borderColor = "#4CAF50"}
                            onBlur={(e) => e.target.style.borderColor = "#ccc"}
                            type="search"
                            name="search"
                            id="search"
                            placeholder="Search for products..."
                        />
                    </div>
                    
                    <div>
                        <select 
                            name="Category" 
                            id="Category"
                            style={{
                                padding: "10px 10px",
                                borderRadius: "10px",
                                border: "1px solid #ccc",
                                fontSize: "16px",
                                cursor: "pointer",
                                outline: "none",

                            }}
                        >
                            <option value="">Shop by Category</option>
                            <option value="Fruits & vegetables">Fruits & vegetables</option>
                            <option value="Snacks & Namkeens">Snacks & Namkeens</option>
                            <option value="Beverages">Beverages</option>
                            <option value="Chilled & Dairy Foods">Chilled & Dairy Foods</option>
                            <option value="Chocolates">Chocolates</option>
                            <option value="Staples">Staples</option>
                            <option value="Pasta, rice, and grains">Pasta, rice, and grains</option>
                            <option value="Personal Care">Personal Care</option>
                            <option value="Skin Care">Skin Care</option>
                            <option value="Creams & Lotions">Creams & Lotions</option>
                            <option value="Crockeries">Crockeries</option>
                        </select>
                    </div>

                    
                    

                    
                    <div style={{ display: "flex", gap: "20px" }}>

                        <NavLink 
                            to="/user"
                            style={{
                                textDecoration: "none",
                                color: "#333",
                                fontSize: "18px",
                                fontWeight: "500",
                            }}
                        >
                            <FaUserAlt />
                        </NavLink>

                        <NavLink 
                            to="/cart"
                            style={{
                                textDecoration: "none",
                                color: "#333",
                                fontSize: "18px",
                                fontWeight: "500",
                            }}
                        >
                            <IoBagHandle />
                        </NavLink>

                    </div>

                </div>

                
                <NavLink to="/"></NavLink>
                <NavLink to="/register"></NavLink>
                <NavLink to="/home"></NavLink>
            </nav>
        </>
    );
}
