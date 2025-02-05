import Navbar from "@/components/Navbar";
import Products from "@/components/Products";
import { Footer } from "@/sections/Footer";
import { Header } from "@/sections/Header";
import { ModalProvider } from "@/components/context/ModalContext";
import { MenuProvider } from "@/components/context/MenuContext";

const admin = () => {
  return (
    <>
          <Navbar />
          <Products />
    </>
  );
}
export default admin