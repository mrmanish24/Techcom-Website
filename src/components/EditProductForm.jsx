// "use client";
// import { useState } from "react";
// import Router from "next/navigation";
// import { useRouter } from "next/navigation";
// import { div } from "framer-motion/client";

// const EditProductForm = ({ id,category,name, price }) => {
//   const router = useRouter();
//   const [newName, setNewName] = useState(name);
//   const [newPrice, setNewPrice] = useState(price);
//   const [newCategory, setCategory] = useState(category);


//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//     const baseUrl =
//       process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000/admin/api";

//       const res = await fetch(`/admin/api/${id}`, {
//         method: "PUT",
//         headers: {
//           "Content-type": "application/json",
//         },
//         body: JSON.stringify({ newCategory, newName, newPrice }),
//       });

//       if (!res.ok) {
//         throw new Error("failed to update topic");
//       }

//       router.push("/admin");
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <div>
//       <div className="container my-6">
//         <h1 className="font-semibold text-2xl">Update Product</h1>
//         <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-6">
//           <input
//             value={newCategory}
//             onChange={(e)=> setCategory(e.target.value)}
//             type="text"
//             placeholder={""}
//             className="border border-gray-300 px-8 py-2"
//           />

//           <input
//             onChange={(e) => setNewName(e.target.value)}
//             value={newName}
//             type="text"
//             placeholder={""}
//             className="border border-gray-300 px-8 py-2"
//           />
//           <input
//             onChange={(e) => setNewPrice(e.target.value)}
//             value={newPrice}
//             type="number"
//             placeholder={""}
//             className="border border-gray-300 px-8 py-2"
//           />
//           <button
//             className=" font-bold bg-blue-500 text-white py-3 px-6"
//             type="submit"
//           >
//             Update Topic
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditProductForm;

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const EditProductForm = ({ id, category, name, price }) => {
  const router = useRouter();
  const [newName, setNewName] = useState(name);
  const [newPrice, setNewPrice] = useState(price);
  const [newCategory, setNewCategory] = useState(category);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const baseUrl =
          process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
      const res = await fetch(`${baseUrl}/admin/api/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: newCategory,
          name: newName,
          price: newPrice,
        }),
      });

      if (!res.ok) throw new Error("Failed to update product");

      router.push("/admin");
    } catch (error) {
      setError("Something went wrong. Please try again.");
      console.log(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto my-10 p-6 bg-white shadow-md rounded-lg border border-gray-200">
      <h1 className="text-2xl font-semibold mb-4 text-center">
        Update Product
      </h1>

      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          type="text"
          placeholder="Category"
          className="border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />

        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          type="text"
          placeholder="Product Name"
          className="border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />

        <input
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
          type="Number"
          placeholder="Price"
          className="border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition-all duration-200"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProductForm;
