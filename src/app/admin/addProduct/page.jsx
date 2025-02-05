"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { div } from "framer-motion/client";
const AddProduct = () => {
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/admin/api', {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ category, name, price }),
      });

      if (res.ok) {
        router.push("/admin");
      } else {
        throw new Error("Failed to create a topic");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="container">
        <h1 className="font-bold text-lg ">Add Product</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-6">
          <input
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            type="text"
            placeholder="Category"
            className="border border-gray-300 px-8 py-2"
            required
          />
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Name"
            className="border border-gray-300 px-8 py-2"
            required
          />
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            type="number"
            placeholder="Price"
            className="border border-gray-300 px-8 py-2"
            required
          />
          <button
            className=" font-bold bg-blue-500 text-white py-3 px-6"
            type="submit"
          >
            {" "}
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};
export default AddProduct;