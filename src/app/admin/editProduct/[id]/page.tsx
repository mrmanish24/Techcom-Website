import EditProductForm from "@/components/EditProductForm";
import pc_parts from "@/models/pcParts";


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
    const res = await fetch(`http://techcom.vercel.app/admin/api/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("faild to fetch Product");
    }
    return res.json();

  } catch (error) {
    console.log(error);
    return null
  }
};
interface EditProductProps{
    params:{id:string}
}
const EditProduct = async ({ params }: EditProductProps) => {
  const { id } = await params;
  const productData = await getProductById(id);
      if (!productData || !productData.Pc_parts) {
        return <p>Product data not found.</p>;
      }
  const {category, name, price } = productData.Pc_parts;
  return (
    <>
      <EditProductForm id={id} category={category} name={name} price={price} />
    </>
  );
};
export default EditProduct;
