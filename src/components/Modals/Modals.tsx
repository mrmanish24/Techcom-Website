"use client"
import React from "react";
import { useModal } from "@/components/context/ModalContext";
export const Modals = () => {
  const {isModalOpen,closeModal,modalContent} = useModal();
  if (!isModalOpen) return null; // If the modal is not open, don't render it
   const handleOverlayClick = (e: React.MouseEvent) => {
     // If the click target is the overlay, close the modal
     if (e.target === e.currentTarget) {
       closeModal();
     }
   };
   const contentWithNewLines = modalContent.content
     .split("\n")
     .map((line, index) => (
       <React.Fragment key={index}>
         {line}
         <br />
       </React.Fragment>
     ));

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 flex items-center justify-center z-50 bg-black/50"
    >
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
        <h1 className="text-xl font-bold text-gray-800 mb-4">
          {modalContent.title}
        </h1>
        <p className="text-gray-600">{contentWithNewLines}</p>
        <button
          onClick={closeModal}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
        >
          Close &rarr;
        </button>
      </div>
    </div>
  );
};

