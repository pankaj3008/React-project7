import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import ShareList from "../components/ShareList";
import "../user.css"
import Popup from "../components/popup";

export function User() {
  let navigate = useNavigate();
  let userId = localStorage.getItem("userId");

  let [userData, setUserData] = useState(null);
  let [popupType, setPopupType] = useState("");


  let [newName, setNewName] = useState("");
  let [newPass, setNewPass] = useState("");

  let [sharedLists, setSharedLists] = useState([]);




async function fetchSharedLists() {
  let res = await fetch(
    `https://grocery-user-9cccc-default-rtdb.firebaseio.com/users/${userId}/sharedLists.json`
  );
  let data = await res.json();

  if (data) {
    setSharedLists(Object.keys(data)); // list IDs
  }
}


  async function fetchUser() {
    let res = await fetch(
      `https://grocery-user-9cccc-default-rtdb.firebaseio.com/users/${userId}.json`
    );

    let data = await res.json();
    setUserData(data);
  }

  useEffect(() => {
    if (userId) {
        fetchUser();
    fetchSharedLists(); 
    }
  }, []);


  async function changeName() {
    if (newName.trim() === "") return alert("Enter valid name");

    await fetch(
      `https://grocery-user-9cccc-default-rtdb.firebaseio.com/users/${userId}.json`,
      {
        method: "PATCH",
        body: JSON.stringify({ name: newName }),
      }
    );

    alert("Name updated!");
    setNewName("");
    fetchUser();
  }

  async function changePassword() {
    if (newPass.trim() === "") return alert("Enter valid password");

    await fetch(
      `https://grocery-user-9cccc-default-rtdb.firebaseio.com/users/${userId}.json`,
      {
        method: "PATCH",
        body: JSON.stringify({ password: newPass }),
      }
    );

    alert("Password updated!");
    setNewPass("");
  }

  function openList(id) {
    localStorage.setItem("listID", id);
    navigate("/home");
  }


  function handleLogout() {
    localStorage.clear();
    navigate("/");
  }


  let popup = null;

  if (popupType === "name") {
    popup = (
      <Popup
        title="Change Name"
        value={newName}
        setValue={setNewName}
        onSubmit={() => {
          changeName();
          setPopupType("");
        }}
        onClose={() => setPopupType("")}
      />
    );
  }

  if (popupType === "password") {
    popup = (
      <Popup
        title="Change Password"
        value={newPass}
        setValue={setNewPass}
        onSubmit={() => {
          changePassword();
          setPopupType("");
        }}
        onClose={() => setPopupType("")}
      />
    );
  }

  if (popupType === "share-list") {
    popup = (
      <div className="popup-overlay">
        <div className="popup-box" style={{ width: "400px", maxHeight: "75vh", overflowY: "auto" }}>
          <h3>Manage Shared Users</h3>

          <ShareList listID={localStorage.getItem("listID")} />

          <button
            onClick={() => setPopupType("")}
            style={{
              marginTop: "15px",
              background: "#ff4757",
              color: "white",
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: "150px" }}>
        <Loader />
      </div>
    );
  }

  return (
    <>
    <div className="user-page">
      {popup}

      <button onClick={() => navigate("/home")}>Home</button>

      <h1>User Profile</h1>

      <p><strong>User ID:</strong> {userId}</p>
      <p><strong>Name:</strong> {userData.name}</p>
      <p><strong>Email:</strong> {userData.email}</p>

      <hr />

      <div style={{ cursor: "pointer" }} onClick={() => setPopupType("name")}>
        Change Name
      </div>

      <hr />

      <div style={{ cursor: "pointer" }} onClick={() => setPopupType("password")}>
        Change Password
      </div>

      <hr />

      <div style={{ cursor: "pointer" }} onClick={() => setPopupType("share-list")}>
        Share List
      </div>

      <hr />

      <button onClick={handleLogout}>Logout</button>



    </div>

    <h3>Shared Lists</h3>

{sharedLists.length === 0 ? (
  <p>No shared lists</p>
) : (
  <ul>
    {sharedLists.map(id => (
      <li key={id}>
        List ID: {id}
        <button onClick={() => openList(id)}>Open</button>
      </li>
    ))}
  </ul>
)}
</>
  );
}
