// import Link from "next/link";
// import { HiPencilAlt } from "react-icons/hi";
// import RemoveBtn from "@/components/RemoveBtn"

// export const dynamic = "force-dynamic";

// const getProduct = async () => {
//   try {
//     const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000/admin/api"
//     const res = await fetch( baseUrl,
//       { cache : "no-cache" }
//     );

//     if (!res.ok) {
//       throw new Error("Failed to fetch Product");
//     }
//     return res.json();
//   } catch (error) {
//     console.log("Error loading product: ", error);
//     return {Pc_parts:[{category:"datanotavilable", name:"server error", price: 402}]}
//   }
// };

// const Products = async () => {
//   const { Pc_parts  } = await getProduct();
//   return (
//     <>
//       <div className="">
//         {Pc_parts.map((p) => (
//           <div key={p._id} className="">
//             <div
//               className="p-4  my-4 flex justify-between
//       gap-5 items-start container border border-slate-300 rounded-xl"
//             >
//               <div>
//                 <div className="font-semibold"> {p.category}</div>
//                 <div className="font-bold text-2xl text-blue-700">{p.name}</div>
//                 <div> 💵{p.price}</div>
//               </div>

//               <div className="flex gap-2 ">
//                 <RemoveBtn id={p._id} />
//                 <Link href={`admin/editProduct/${p._id}`}>
//                   <HiPencilAlt size={24} />
//                 </Link>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };
// export default Products;

import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";
import RemoveBtn from "@/components/RemoveBtn";

export const dynamic = "force-dynamic";

const getProduct = async () => {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000/admin/api";
    const res = await fetch(baseUrl, { cache: "no-cache" });

    if (!res.ok) {
      throw new Error("Failed to fetch Product");
    }
    return res.json();
  } catch (error) {
    console.log("Error loading product: ", error);
    return {
      Pc_parts: [
        { category: "Data Not Available", name: "Server Error", price: 402 },
      ],
    };
  }
};

const Products = async () => {
  const { Pc_parts } = await getProduct();
  return (
    <div className="max-w-5xl mx-auto px-4 my-5">
      <h1 className="text-3xl font-bold text-center my-6">Product List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Pc_parts.map((p) => (
          <div
            key={p._id}
            className="bg-white border border-gray-300 shadow-md rounded-xl p-5"
          >
            <div className="mb-4">
              <div className="text-sm text-gray-500">{p.category}</div>
              <div className="font-bold text-xl text-blue-700">{p.name}</div>
              <div className="text-lg font-medium text-gray-700">
                💵 {p.price}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <RemoveBtn id={p._id} />
              <Link
                href={`admin/editProduct/${p._id}`}
                className="text-blue-600 hover:text-blue-800"
              >
                <HiPencilAlt size={24} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
