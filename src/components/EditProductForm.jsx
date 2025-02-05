"use client";
import { useState } from "react";
import Router from "next/navigation";
import { useRouter } from "next/navigation";
import { div } from "framer-motion/client";

const EditProductForm = ({ id,category,name, price }) => {
  const router = useRouter();
  const [newName, setNewName] = useState(name);
  const [newPrice, setNewPrice] = useState(price);
  const [newCategory, setCategory] = useState(category);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/admin/api/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ category, newName, newPrice }),
      });

      if (!res.ok) {
        throw new Error("failed to update topic");
      }

      router.push("/admin");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="container my-6">
        <h1 className="font-semibold text-2xl">Update Product</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-6">
          <input
            value={category}
            onChange={(e)=> setCategory(e.target.value)}
            type="text"
            placeholder={""}
            className="border border-gray-300 px-8 py-2"
          />
          <input
            onChange={(e) => setNewName(e.target.value)}
            value={newName}
            type="text"
            placeholder={""}
            className="border border-gray-300 px-8 py-2"
          />
          <input
            onChange={(e) => setNewPrice(e.target.value)}
            value={newPrice}
            type="number"
            placeholder={""}
            className="border border-gray-300 px-8 py-2"
          />
          <button
            className=" font-bold bg-blue-500 text-white py-3 px-6"
            type="submit"
          >
            Update Topic
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProductForm;
