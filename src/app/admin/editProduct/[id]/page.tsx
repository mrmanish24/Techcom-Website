import EditProductForm from "@/components/EditProductForm";
import pc_parts from "@/models/pcParts";
import { cache } from "react";
export const dynamic = "force-dynamic";


interface ProductResponse {
    Pc_parts:{
        id: string;
        category: string;
        name: string;
        price: number;
    };
}

const getProductById = async (id:string): Promise<ProductResponse | null> => {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const res = await fetch(`${baseUrl}/admin/api/${id}`, {
       cache : "no-cache"
    });

    if (!res.ok) {
      throw new Error("failed to fetch Product");
    }
    return res.json();

  } catch (error) {
    console.log(error);
    return null
  }
};

interface EditProductProps {
  params: Promise<{ id: string }>;
}
const EditProduct = async ({ params }: EditProductProps) => {
  const { id } = await params;
  const productData = await getProductById(id);

      if (!productData || !productData.Pc_parts) {
        return <p>Product data not found.</p>;
      }
   console.log("product:", productData?.Pc_parts);
   console.log("id:", id);
  const {category, name, price } = productData.Pc_parts;
  return (
    <>
      <EditProductForm id={id} category={category} name={name} price={price} />
    </>
  );
};
export default EditProduct;
