export default function Popup({ title, value, setValue, onSubmit, onClose }) {
  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <h3>{title}</h3>

        <input
          className="popup-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter here..."
        />

        <div className="popup-btns">
          <button onClick={onSubmit}>Submit</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
