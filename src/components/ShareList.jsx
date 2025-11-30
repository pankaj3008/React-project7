import { useEffect, useState } from "react";
import Popup from "./popup";
import "../user.css"
export default function ShareList({ listID }) {
  const [sharedUsers, setSharedUsers] = useState({});
  const [addUserId, setAddUserId] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);

  async function fetchSharedUsers() {
    let res = await fetch(
      `https://grocery-user-9cccc-default-rtdb.firebaseio.com/lists/${listID}/sharedWith.json`
    );

    let data = await res.json();
    setSharedUsers(data || {});
  }

  useEffect(() => {
    fetchSharedUsers();
  }, []);

  // Add user
 async function addUser() {
  if (!addUserId.trim()) return alert("Enter User ID");

  // 🔍 Check if user exists
  let userCheck = await fetch(
    `https://grocery-user-9cccc-default-rtdb.firebaseio.com/users/${addUserId}.json`
  );
  let userExists = await userCheck.json();

  if (!userExists) {
    alert("User ID does not exist!");
    return;
  }

  // ✅ Add user to list
  await fetch(
    `https://grocery-user-9cccc-default-rtdb.firebaseio.com/lists/${listID}/sharedWith.json`,
    {
      method: "PATCH",
      body: JSON.stringify({ [addUserId]: true }),
    }
  );

  // ✅ Add list to user profile
  await fetch(
    `https://grocery-user-9cccc-default-rtdb.firebaseio.com/users/${addUserId}/sharedLists.json`,
    {
      method: "PATCH",
      body: JSON.stringify({ [listID]: true }),
    }
  );

  alert("User added to shared list!");
  setAddUserId("");
  setPopupOpen(false);
  fetchSharedUsers();
}


  // Remove user
  async function removeUser(uid) {
    await fetch(
      `https://grocery-user-9cccc-default-rtdb.firebaseio.com/lists/${listID}/sharedWith/${uid}.json`,
      { method: "DELETE" }
    );

    await fetch(
      `https://grocery-user-9cccc-default-rtdb.firebaseio.com/users/${uid}/sharedLists/${listID}.json`,
      { method: "DELETE" }
    );

    alert("User removed");
    fetchSharedUsers();
  }

  return (
    <div className="share-box">
      <h3>Shared With:</h3>

      {Object.keys(sharedUsers).length === 0 ? (
        <p>No shared users.</p>
      ) : (
        <ul className="shared-list">
          {Object.keys(sharedUsers).map((uid) => (
            <li key={uid}>
              <span>User: {uid}</span>
              <button className="remove-btn" onClick={() => removeUser(uid)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      <button className="add-btn" onClick={() => setPopupOpen(true)}>
        + Add User
      </button>

      {popupOpen && (
        <Popup
          title="Add User"
          value={addUserId}
          setValue={setAddUserId}
          onSubmit={addUser}
          onClose={() => setPopupOpen(false)}
        />
      )}
    </div>
  );
}
