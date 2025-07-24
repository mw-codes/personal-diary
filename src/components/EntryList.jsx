import { useEffect, useState } from "react";

const EntryList = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("entries") || "[]");
    setEntries(saved.reverse()); // Neueste oben
  }, []);

  if (entries.length === 0) {
    return <p className="text-gray-500">Noch keine Einträge vorhanden.</p>;
  }

  return (
    <ul className="space-y-4">
      {entries.map((entry, index) => (
        <li key={index} className="p-4 bg-base-100 rounded shadow">
          <p className="text-sm text-gray-400">
            {new Date(entry.date).toLocaleString()}
          </p>
          <p className="mt-2 whitespace-pre-wrap">{entry.text}</p>
        </li>
      ))}
    </ul>
  );
};

export default EntryList;
