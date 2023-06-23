import { useState, useEffect } from "react";

type SetValue<T> = (value: T) => void;
type DeleteValue = () => void;

function useLocalStorage<T>(
  key: string
): [T | undefined, SetValue<T>, DeleteValue] {
  // Retrieve the initial value from localStorage or use a default value
  const [storedValue, setStoredValue] = useState<T | undefined>(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : undefined;
  });

  // Update the value in localStorage whenever the state changes
  useEffect(() => {
    if (storedValue) {
      localStorage.setItem(key, JSON.stringify(storedValue));
    }
  }, [key, storedValue]);

  // Listen for changes in localStorage and update the state
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key) {
        const newValue = event.newValue
          ? JSON.parse(event.newValue)
          : undefined;
        setStoredValue(newValue);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key]);

  // Update the value in localStorage and state
  const setValue: SetValue<T> = (value) => {
    setStoredValue(value);
  };

  // Delete the value from localStorage and reset state
  const deleteValue: DeleteValue = () => {
    localStorage.removeItem(key);
    setStoredValue(undefined);
  };

  return [storedValue, setValue, deleteValue];
}

export default useLocalStorage;
