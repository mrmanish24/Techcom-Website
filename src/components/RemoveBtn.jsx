"use client";
import { useRouter } from "next/navigation";
import { HiOutlineTrash } from "react-icons/hi";

const RemoveBtn = ({ id }) => {
  const router = useRouter();

  const removeProduct = async () => {
    const confirmed = confirm("Are you Sure?");
    if (confirmed) {
      const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
      const res = await fetch(`${baseUrl}/admin/api/?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
      } else {
        console.log(`this is error no response :${Error}`);
      }
    }
  };

  return (
    <button onClick={removeProduct} className="text-red-400">
      <HiOutlineTrash size={24} />
    </button>
  );
};
export default RemoveBtn;
