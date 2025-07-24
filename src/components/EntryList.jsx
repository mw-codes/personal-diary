import { useEffect, useState } from "react";

const EntryList = () => {
  const [entries, setEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null); // Fokus-Modus

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("entries") || "[]");
    setEntries(saved.reverse());
  }, []);

  if (entries.length === 0) {
    return <p className="text-gray-500">Noch keine Einträge vorhanden.</p>;
  }
  const handleDelete = () => {
    const updatedEntries = entries.filter(
      (e) => e.createdAt !== selectedEntry.createdAt
    );
    localStorage.setItem("entries", JSON.stringify(updatedEntries));
    setEntries(updatedEntries);
    setSelectedEntry(null); // Modal schließen
  };
  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {entries.map((entry, index) => (
          <div
            key={index}
            className="card bg-base-100 shadow-xl border border-base-300 hover:scale-[1.01] transition cursor-pointer"
            onClick={() => setSelectedEntry(entry)}
          >
            {entry.imageUrl && (
              <figure>
                <img
                  src={entry.imageUrl}
                  alt="Tagebuchbild"
                  className="h-48 w-full object-cover"
                />
              </figure>
            )}

            <div className="card-body">
              <h2 className="card-title">{entry.title}</h2>
              <p className="text-sm text-gray-500">
                {new Date(entry.createdAt).toLocaleDateString()}
              </p>
              <p className="line-clamp-3">{entry.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Fokus-Modal */}
      {selectedEntry && (
        <>
          <input
            type="checkbox"
            id="view-modal"
            className="modal-toggle"
            checked
            readOnly
          />
          <div className="modal modal-open">
            <div className="modal-box max-w-2xl">
              {selectedEntry.imageUrl && (
                <img
                  src={selectedEntry.imageUrl}
                  alt="Bild"
                  className="w-full h-64 object-cover mb-4 rounded"
                />
              )}
              <h2 className="text-xl font-bold">{selectedEntry.title}</h2>
              <p className="text-sm text-gray-500 mb-2">
                {new Date(selectedEntry.date).toLocaleDateString()}
              </p>
              <p className="whitespace-pre-wrap">{selectedEntry.content}</p>

              <div className="modal-action justify-between">
                <button className="btn btn-error" onClick={handleDelete}>
                  Löschen
                </button>
                <button className="btn" onClick={() => setSelectedEntry(null)}>
                  Schließen
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default EntryList;
