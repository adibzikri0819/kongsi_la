// frontend/api.js
import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAllProducts = async (category, sort) => {
  try {
    const response = await api.get('/inventory', {
      params: { category, sort },
    });
    console.log(response)
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching products: ${error.message}`);
  }
};

export const getProductById = async (id) => {
  try {
    const response = await api.get(`/inventory/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching product: ${error.message}`);
  }
};

export const addProduct = async (newProduct) => {
  try {
    const response = await api.post('/add-inventory', newProduct);
    return response.data;
  } catch (error) {
    throw new Error(`Error adding product: ${error.message}`);
  }
};

export const updateProduct = async (id, updatedProduct) => {
  try {
    const response = await api.put(`/update-inventory/${id}`, updatedProduct);
    return response.data;
  } catch (error) {
    throw new Error(`Error updating product: ${error.message}`);
  }
};

export const deleteProduct = async (id) => {
  try {
    await api.delete(`/delete-inventory/${id}`);
  } catch (error) {
    throw new Error(`Error deleting product: ${error.message}`);
  }
};
