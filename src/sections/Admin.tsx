// components/AdminPanel.tsx
"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  platform?: string;
}

const AdminPanel: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Product>({
    _id: "",
    name: "",
    price: 0,
    category: "",
  });
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  useEffect(() => {
    // Fetch products from the API
    axios
      .get("/api/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products", error));
  }, []);

  const handleAddProduct = () => {
    axios
      .post("/api/products", newProduct)
      .then((response) => setProducts([...products, response.data]))
      .catch((error) => console.error("Error adding product", error));
  };

  const handleDeleteProduct = (id: string) => {
    axios
      .delete(`/api/products/${id}`)
      .then(() => setProducts(products.filter((product) => product._id !== id)))
      .catch((error) => console.error("Error deleting product", error));
  };

  const handleEditProduct = (id: string) => {
    axios
      .put(`/api/products/${id}/update`, editProduct)
      .then((response) => {
        const updatedProducts = products.map((product) =>
          product._id === id ? response.data : product
        );
        setProducts(updatedProducts);
        setEditProduct(null);
      })
      .catch((error) => console.error("Error updating product", error));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

      {/* Add Product */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
        <input
          type="text"
          placeholder="Product Name"
          className="border p-2 rounded-md w-full mb-4"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Product Price"
          className="border p-2 rounded-md w-full mb-4"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: Number(e.target.value) })
          }
        />
        <input
          type="text"
          placeholder="Category"
          className="border p-2 rounded-md w-full mb-4"
          value={newProduct.category}
          onChange={(e) =>
            setNewProduct({ ...newProduct, category: e.target.value })
          }
        />
        <button
          onClick={handleAddProduct}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Add Product
        </button>
      </div>

      {/* Product List */}
      <h2 className="text-2xl font-semibold mb-4">Product List</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td className="border p-2">{product._id}</td>
              <td className="border p-2">{product.name}</td>
              <td className="border p-2">{product.price}</td>
              <td className="border p-2">{product.category}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleDeleteProduct(product._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  Delete
                </button>
                <button
                  onClick={() => setEditProduct(product)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md ml-2"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Product Modal (simple) */}
      {editProduct && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md">
            <h3 className="text-xl mb-4">Edit Product</h3>
            <input
              type="text"
              placeholder="Product Name"
              value={editProduct.name}
              onChange={(e) =>
                setEditProduct({ ...editProduct, name: e.target.value })
              }
              className="border p-2 mb-4"
            />
            <input
              type="number"
              placeholder="Price"
              value={editProduct.price}
              onChange={(e) =>
                setEditProduct({
                  ...editProduct,
                  price: Number(e.target.value),
                })
              }
              className="border p-2 mb-4"
            />
            <button
              onClick={() => handleEditProduct(editProduct._id)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Save Changes
            </button>
            <button
              onClick={() => setEditProduct(null)}
              className="bg-gray-500 text-white px-4 py-2 rounded-md ml-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
