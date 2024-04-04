import React, { createContext, useState, useContext } from 'react';

// Create context
const SelectedProductsContext = createContext();

// Custom hook to use selectedProducts context
export const useSelectedProducts = () => {
  return useContext(SelectedProductsContext);
};

// Context Provider
export const SelectedProductsProvider = ({ children }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);

  return (
    <SelectedProductsContext.Provider value={{ selectedProducts, setSelectedProducts }}>
      {children}
    </SelectedProductsContext.Provider>
  );
};
