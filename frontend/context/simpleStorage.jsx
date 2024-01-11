"use client";
import { createContext, useState, useContext } from "react";

const SimpleStorage = createContext({});

export const SimpleStorageProvider = ({ children }) => {
  const [value, setValue] = useState(0);

  return (
    <SimpleStorage.Provider
      value={{
        value,
        setValue,
      }}
    >
      {children}
    </SimpleStorage.Provider>
  );
};

export const useSimpleStorageContext = () => useContext(SimpleStorage);
