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
    <ul className="space-y-4">
      {entries.map((entry, index) => (
        <li key={index} className="p-4 bg-base-100 rounded shadow">
          <p className="text-xs text-gray-400">
            Eingetragen am: {new Date(entry.createdAt).toLocaleString()}
          </p>
          <h3 className="text-lg font-semibold">{entry.title}</h3>
          <p className="text-sm text-gray-500">Datum: {entry.date}</p>

          {entry.imageUrl && (
            <img
              src={entry.imageUrl}
              alt="Tagebucheintrag"
              className="mt-2 max-h-48 object-cover rounded"
            />
          )}

          <p className="mt-2 whitespace-pre-wrap">{entry.content}</p>
        </li>
      ))}
    </ul>
  );
};

export default EntryList;
