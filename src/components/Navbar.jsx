import Link from "next/link";
const Navbar = () => {
  return (
    <>
      <div>
        <nav>
          <div className="mt-6 container border border-gray-800 rounded-3xl">
            <div className="flex justify-between items-center px-4 py-2   ">
              <div className="font-bold">ADMIN PANEL</div>
              <div className="py-2 px-4 border border-gray-500 bg-blue-500 rounded-2xl">
                <Link href={"admin/addProduct"}>ADD PRODUCT</Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
export default Navbar
