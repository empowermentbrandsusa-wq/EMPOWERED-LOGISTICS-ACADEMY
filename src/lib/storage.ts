import { useState } from "react";
export function useLocalList(key: string) {
  const [items, setItems] = useState<string[]>(() => {
    try {
      const data: unknown = JSON.parse(localStorage.getItem(key) || "[]");
      return Array.isArray(data)
        ? data.filter((v): v is string => typeof v === "string").slice(0, 500)
        : [];
    } catch {
      return [];
    }
  });
  const [warning, setWarning] = useState("");
  const toggle = (id: string) =>
    setItems((prev) => {
      const next = prev.includes(id)
        ? prev.filter((v) => v !== id)
        : [...prev, id];
      try {
        localStorage.setItem(key, JSON.stringify(next));
      } catch {
        setWarning(
          "Storage is unavailable. Changes will last for this visit only.",
        );
      }
      return next;
    });
  const clear = () => {
    try {
      localStorage.removeItem(key);
    } catch {
      setWarning("Storage could not be cleared on this device.");
    }
    setItems([]);
  };
  return { items, toggle, clear, warning };
}
