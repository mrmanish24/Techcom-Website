"use client";
import { useRouter } from "next/navigation";
import { HiOutlineTrash } from "react-icons/hi";

const RemoveBtn = ({ id }) => {
  const router = useRouter();

  const removeProduct = async () => {
    const confirmed = confirm("Are you Sure?");
    if (confirmed) {
      const res = await fetch(`http://localhost:3000/admin/api/?id=${id}`, {
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
