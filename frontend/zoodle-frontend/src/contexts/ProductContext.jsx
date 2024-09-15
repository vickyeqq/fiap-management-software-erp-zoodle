import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ProductContext = createContext();

const API_BASE_URL = 'http://localhost:8080/api/v1'; // Ajuste conforme necessário

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/produto`);
      setProducts(response.data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  const addProduct = async (product) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/produto`, product);
      setProducts([...products, response.data]);
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
    }
  };

  const updateProduct = async (updatedProduct) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/produto/${updatedProduct.id}`, updatedProduct);
      const updatedProducts = products.map(p => 
        p.id === updatedProduct.id ? response.data : p
      );
      setProducts(updatedProducts);
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`${API_BASE_URL}/produto/${productId}`);
      const filteredProducts = products.filter(p => p.id !== productId);
      setProducts(filteredProducts);
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
    }
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};