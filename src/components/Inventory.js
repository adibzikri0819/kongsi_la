import React, { useState, useEffect } from 'react';
import ProductTable from './ProductTable';
import ProductForm from './ProductForm';
import { getAllProducts, addProduct } from '../services/api'; // Assuming api.js is in the services folder

const Inventory = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
      console.log(data)
      console.log("TEST")
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAddProduct = async (newProduct) => {
    try {
      await addProduct(newProduct);
      fetchProducts(); // Fetch updated product list after adding
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div>
      <h1>Inventory</h1>
      {console.log(products)}
      <ProductTable products={products} />
      <ProductForm onAddProduct={handleAddProduct} />
    </div>
  );
};

export default Inventory;
