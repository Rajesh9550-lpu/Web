import React, { createContext, useState, useContext } from 'react';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [adminType, setAdminType] = useState('admin'); // Default admin type is 'admin'

  return (
    <AdminContext.Provider value={{ adminType, setAdminType }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => useContext(AdminContext);
