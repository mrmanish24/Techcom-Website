// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { div } from "framer-motion/client";
// const AddProduct = () => {
//   const [category, setCategory] = useState("");
//   const [name, setName] = useState("");
//   const [price, setPrice] = useState(0);

//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch('/admin/api', {
//         method: "POST",
//         headers: {
//           "Content-type": "application/json",
//         },
//         body: JSON.stringify({ category, name, price }),
//       });

//       if (res.ok) {
//         router.push("/admin");
//       } else {
//         throw new Error("Failed to create a topic");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <div>
//       <div className="container">
//         <h1 className="font-bold text-lg ">Add Product</h1>
//         <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-6">
//           <input
//             onChange={(e) => setCategory(e.target.value)}
//             value={category}
//             type="text"
//             placeholder="Category"
//             className="border border-gray-300 px-8 py-2"
//             required
//           />
//           <input
//             onChange={(e) => setName(e.target.value)}
//             value={name}
//             type="text"
//             placeholder="Name"
//             className="border border-gray-300 px-8 py-2"
//             required
//           />
//           <input
//             onChange={(e) => setPrice(e.target.value)}
//             value={price}
//             type="number"
//             placeholder="Price"
//             className="border border-gray-300 px-8 py-2"
//             required
//           />
//           <button
//             className=" font-bold bg-blue-500 text-white py-3 px-6"
//             type="submit"
//           >
//             {" "}
//             Add Product
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };
// export default AddProduct;

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const AddProduct = () => {
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [error, setError] = useState(null);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error message

    try {
      const res = await fetch("/admin/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, name, price }),
      });

      if (res.ok) {
        router.push("/admin");
      } else {
        throw new Error("Failed to add product");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto my-10 p-6 bg-white shadow-md rounded-lg border border-gray-200">
      <h1 className="text-2xl font-semibold text-center mb-4">Add Product</h1>

      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          value={category.toUpperCase()}
          onChange={(e) => setCategory(e.target.value)}
          type="text"
          placeholder="Category"
          className="border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
          required
        />

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Product Name"
          className="border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
          required
        />

        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type="number"
          placeholder="Price"
          className="border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition-all duration-200"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
