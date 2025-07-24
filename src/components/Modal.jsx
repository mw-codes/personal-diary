import { useState } from "react"; // useState einbinden zum speichern

const Modal = () => {
  const [title, setTitle] = useState(""); // title: Der Titel der eingegeben werden kann setTitle: Funktion mit der title geändert wird
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10)); // date: Datum das eingegebn werden kann setDate: Funktion mit der das Datum geändert werden kann
  // Wir setzen den Standartwert des Datums auf den heutigen Wert und beschneiden es mit slice.
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState("");

  const handleSave = () => {
    /* Bei leerem Feld wird nichts gespeichert*/
    if (!title.trim() || !content.trim()) return;
    /* Neuen Eintrag erstellen  */
    const newEntry = {
      title,
      date,
      imageUrl,
      content,
      createdAt: new Date().toISOString(),
    };
    /* Bei Bedarf local Storage mit leerem Array initialisieren */
    const existing = JSON.parse(localStorage.getItem("entries") || "[]");
    /** Neuen Eintrag an die Liste anfügen  */
    const updated = [...existing, newEntry];
    /* Als Text die LIste im local Storage speichern mit stringify */
    localStorage.setItem("entries", JSON.stringify(updated));

    /* Formular leeren */
    setTitle("");
    setDate(new Date().toISOString().slice(0, 10));
    setImageUrl("");
    setContent("");
    /* Modal ausblenden indem das versteckte checkbox Element auf false gesetzt wir*/
    document.getElementById("new-entry-modal").checked = false;
  };

  return (
    <>
      {/* DaisyUI verwendet eine Checkbox als Steuerung für das Modal. Wenn sie „gecheckt“ ist → Modal ist sichtbar. */}
      <input type="checkbox" id="new-entry-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box max-w-xl">
          <h3 className="font-bold text-lg">Neuer Tagebucheintrag</h3>
          {/*Formular */}
          {/* Eingabefeld mit title-State verbinden zentrale Trick von React: Zustand (State) ist die Wahrheit – die Eingabefelder zeigen nur, was im State steht. */}
          <div className="form-control mt-4">
            <label className="label">Titel</label>
            <input
              type="text"
              className="input input-bordered"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Titel des Eintrags"
            />
          </div>

          <div className="form-control mt-4">
            <label className="label">Datum</label>
            <input
              type="date"
              className="input input-bordered"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="form-control mt-4">
            <label className="label">Bild-URL (optional)</label>
            <input
              type="url"
              className="input input-bordered"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://..."
            />
          </div>

          <div className="form-control mt-4">
            <label className="label">Inhalt</label>
            <textarea
              className="textarea textarea-bordered h-24"
              placeholder="Was möchtest du heute festhalten?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>

          <div className="modal-action">
            <label htmlFor="new-entry-modal" className="btn">
              Abbrechen
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
