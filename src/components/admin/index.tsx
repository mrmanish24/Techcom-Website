// pages/admin/index.tsx
"use client"
import { useState, useEffect } from "react";
import axios from "axios";

const AdminPanel = () => {
  const [processors, setProcessors] = useState([]);
  const [motherboards, setMotherboards] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", price: "", type: "" });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch the data for processors and motherboards from the API on component mount
    const fetchData = async () => {
      try {
        const resProcessors = await axios.get("/api/products?type=PROCESSOR");
        const resMotherboards = await axios.get(
          "/api/products?type=MOTHERBOARD"
        );
        setProcessors(resProcessors.data);
        setMotherboards(resMotherboards.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Add a new product
  const addProduct = async () => {
    if (!newItem.name || !newItem.price || !newItem.type) {
      alert("Please fill all fields");
      return;
    }

    // Check if the product already exists
    const existingProduct = (
      newItem.type === "PROCESSOR" ? processors : motherboards
    ).find((item: any) => item.name === newItem.name);

    if (existingProduct) {
      alert("Product already exists");
      return;
    }

    try {
      await axios.post("/api/products", newItem);
      alert("Product added successfully!");
      setNewItem({ name: "", price: "", type: "" }); // Clear the input fields
      // Fetch the updated data
      const fetchData = async () => {
        try {
          const resProcessors = await axios.get("/api/products?type=PROCESSOR");
          const resMotherboards = await axios.get(
            "/api/products?type=MOTHERBOARD"
          );
          setProcessors(resProcessors.data);
          setMotherboards(resMotherboards.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // Filter products based on search query
  const filteredProcessors = processors.filter((item: any) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMotherboards = motherboards.filter((item: any) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-4">Admin Panel</h2>

      {/* Search Bar */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search products"
        className="mb-4 p-2 border rounded w-full"
      />

      {/* Display Processors */}
      <div className="mb-6">
        <h3 className="text-2xl font-semibold">Processors</h3>
        <ul>
          {filteredProcessors.map((processor: any) => (
            <li key={processor.name} className="border p-2 mb-2">
              {processor.name} - ₹{processor.price}
            </li>
          ))}
        </ul>
      </div>

      {/* Display Motherboards */}
      <div className="mb-6">
        <h3 className="text-2xl font-semibold">Motherboards</h3>
        <ul>
          {filteredMotherboards.map((motherboard: any) => (
            <li key={motherboard.name} className="border p-2 mb-2">
              {motherboard.name} - ₹{motherboard.price}
            </li>
          ))}
        </ul>
      </div>

      {/* Add New Product Form */}
      <h3 className="text-2xl font-semibold mb-4">Add New Product</h3>
      <select
        value={newItem.type}
        onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
        className="mb-2 p-2 border rounded"
      >
        <option value="">Select Product Type</option>
        <option value="PROCESSOR">Processor</option>
        <option value="MOTHERBOARD">Motherboard</option>
        {/* Add more options here if needed */}
      </select>
      <input
        type="text"
        value={newItem.name}
        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        placeholder="Product Name"
        className="mb-2 p-2 border rounded w-full"
      />
      <input
        type="number"
        value={newItem.price}
        onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
        placeholder="Product Price"
        className="mb-4 p-2 border rounded w-full"
      />
      <button
        onClick={addProduct}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Add Product
      </button>
    </div>
  );
};

export default AdminPanel;
