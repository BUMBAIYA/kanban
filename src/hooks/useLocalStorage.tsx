import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";

type setValue<T> = Dispatch<SetStateAction<T>>;

export default function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, setValue<T>] {
  const readValue = useCallback((): T => {
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Error reading localstorage key "${key}":  `, error);
      return initialValue;
    }
  }, [initialValue, key]);

  const [storedValue, setStoredValue] = useState<T>(readValue);

  const setValue: setValue<T> = useCallback(
    (value) => {
      try {
        const newValue = value instanceof Function ? value(storedValue) : value;
        window.localStorage.setItem(key, JSON.stringify(newValue));
        setStoredValue(newValue);
      } catch (error) {
        console.warn(`Error setting localStorage key “${key}”:`, error);
      }
    },
    [storedValue]
  );

  useEffect(() => {
    setStoredValue(readValue);
  }, []);

  return [storedValue, setValue];
}
