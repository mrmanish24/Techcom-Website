import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";
import RemoveBtn from "@/components/RemoveBtn"

export const dynamic = "force-dynamic";

const getProduct = async () => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000/admin/api"
    const res = await fetch( baseUrl,
      { cache : "no-cache" }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch Product");
    }
    return res.json();
  } catch (error) {
    console.log("Error loading product: ", error);
    return {Pc_parts:[{category:"datanotavilable", name:"server error", price: 402}]}
  }
};

const Products = async () => {
  const { Pc_parts  } = await getProduct();
  return (
    <>
      <div className="">
        {Pc_parts.map((p) => (
          <div key={p._id} className="">
            <div
              className="p-4  my-4 flex justify-between
      gap-5 items-start container border border-slate-300 rounded-xl"
            >
              <div>
                <div className="font-semibold"> {p.category}</div>
                <div className="font-bold text-2xl text-blue-700">{p.name}</div>
                <div> 💵{p.price}</div>
              </div>

              <div className="flex gap-2 ">
                <RemoveBtn id={p._id} />
                <Link href={`admin/editProduct/${p._id}`}>
                  <HiPencilAlt size={24} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default Products;
