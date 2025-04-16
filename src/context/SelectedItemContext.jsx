import React, { createContext, useState } from "react";


export const SelectedItemContext = createContext();

export const SelectedItemProvider = ({ children }) => {
  const [selectedItem, setSelectedItem] = useState({ title: "", hierarchy: "" });

  return (
    <SelectedItemContext.Provider value={{ selectedItem, setSelectedItem }}>
      {children}
    </SelectedItemContext.Provider>
  );
};