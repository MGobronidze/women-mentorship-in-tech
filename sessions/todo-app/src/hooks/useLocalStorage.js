import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue) {
  // ინიციალიზაცია: ვცდილობთ ამოვიღოთ localStorage-დან მონაცემები
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // როდესაც value იცვლება, ვინახავთ localStorage-ში
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, value]);

  return [value, setValue];
}