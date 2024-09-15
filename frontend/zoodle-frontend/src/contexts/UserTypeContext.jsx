import React, { createContext, useContext, useState, useEffect } from 'react';

const UserTypeContext = createContext();

const API_BASE_URL = 'http://localhost:8080/api/v1';

export const useUserTypes = () => useContext(UserTypeContext);

export const UserTypeProvider = ({ children }) => {
  const [userTypes, setUserTypes] = useState([]);

  useEffect(() => {
    fetchUserTypes();
  }, []);

  const fetchUserTypes = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/tipo-usuario`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setUserTypes(data);
    } catch (error) {
      console.error('Erro ao buscar tipos de usuário:', error);
    }
  };

  const addUserType = async (userType) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tipo-usuario`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userType),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const newUserType = await response.json();
      setUserTypes([...userTypes, newUserType]);
    } catch (error) {
      console.error('Erro ao adicionar tipo de usuário:', error);
      throw error;
    }
  };

  const updateUserType = async (updatedUserType) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tipo-usuario/${updatedUserType.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUserType),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setUserTypes(userTypes.map(ut => ut.id === updatedUserType.id ? data : ut));
    } catch (error) {
      console.error('Erro ao atualizar tipo de usuário:', error);
      throw error;
    }
  };

  const deleteUserType = async (userTypeId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tipo-usuario/${userTypeId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setUserTypes(userTypes.filter(ut => ut.id !== userTypeId));
      return true;
    } catch (error) {
      console.error('Erro ao deletar tipo de usuário:', error);
      throw error;
    }
  };

  return (
    <UserTypeContext.Provider value={{ userTypes, addUserType, updateUserType, deleteUserType }}>
      {children}
    </UserTypeContext.Provider>
  );
};