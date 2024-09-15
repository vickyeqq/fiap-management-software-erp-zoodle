import React, { createContext, useContext, useState, useEffect } from 'react';

const SupplierContext = createContext();

const API_BASE_URL = 'http://localhost:8080/api/v1';

export const useSuppliers = () => useContext(SupplierContext);

export const SupplierProvider = ({ children }) => {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/fornecedor`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setSuppliers(data);
    } catch (error) {
      console.error('Erro ao buscar fornecedores:', error);
    }
  };

  const addSupplier = async (supplier) => {
    try {
      const response = await fetch(`${API_BASE_URL}/fornecedor`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(supplier),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const newSupplier = await response.json();
      setSuppliers([...suppliers, newSupplier]);
    } catch (error) {
      console.error('Erro ao adicionar fornecedor:', error);
      throw error;
    }
  };

  const updateSupplier = async (updatedSupplier) => {
    try {
      const response = await fetch(`${API_BASE_URL}/fornecedor/${updatedSupplier.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedSupplier),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setSuppliers(suppliers.map(s => s.id === updatedSupplier.id ? data : s));
    } catch (error) {
      console.error('Erro ao atualizar fornecedor:', error);
      throw error;
    }
  };

  const deleteSupplier = async (supplierId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/fornecedor/${supplierId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setSuppliers(suppliers.filter(s => s.id !== supplierId));
      return true;
    } catch (error) {
      console.error('Erro ao deletar fornecedor:', error);
      throw error;
    }
  };

  return (
    <SupplierContext.Provider value={{ suppliers, addSupplier, updateSupplier, deleteSupplier }}>
      {children}
    </SupplierContext.Provider>
  );
};