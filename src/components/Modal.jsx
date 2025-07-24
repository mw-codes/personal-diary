import { useState } from "react";

const Modal = () => {
  const [entry, setEntry] = useState("");

  const handleSave = () => {
    if (!entry.trim()) return;

    const existing = JSON.parse(localStorage.getItem("entries") || "[]");
    const updated = [
      ...existing,
      { text: entry, date: new Date().toISOString() },
    ];

    localStorage.setItem("entries", JSON.stringify(updated));
    setEntry(""); // Reset textarea
    document.getElementById("new-entry-modal").checked = false; // Close modal
  };

  return (
    <>
      <input type="checkbox" id="new-entry-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Neuer Tagebucheintrag</h3>
          <textarea
            className="textarea textarea-bordered w-full mt-4"
            placeholder="Was möchtest du heute festhalten?"
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
          ></textarea>
          <div className="modal-action">
            <label htmlFor="new-entry-modal" className="btn">
              Schließen
            </label>
            <button className="btn btn-primary" onClick={handleSave}>
              Speichern
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
