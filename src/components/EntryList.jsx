import { useEffect, useState } from "react";

const EntryList = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("entries") || "[]");
    setEntries(saved.reverse());
  }, []);

  if (entries.length === 0) {
    return <p className="text-gray-500">Noch keine Einträge vorhanden.</p>;
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {entries.map((entry, index) => (
        <div
          key={index}
          className="card bg-base-100 shadow-xl border border-base-300"
        >
          {entry.imageUrl && (
            <figure>
              <img
                src={entry.imageUrl}
                alt="Tagebucheintrag Bild"
                className="h-48 w-full object-cover"
              />
            </figure>
          )}

          <div className="card-body">
            <h2 className="card-title">{entry.title}</h2>

            <p className="text-sm text-gray-500">
              Eingetragen am {new Date(entry.createdAt).toLocaleDateString()}
            </p>

            <p className="whitespace-pre-wrap mt-2">{entry.content}</p>

            <div className="card-actions justify-end">
              <span className="badge badge-outline">{entry.date}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EntryList;
