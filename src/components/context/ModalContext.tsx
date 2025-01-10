"use client"
import { createContext, useState, useContext ,useCallback} from "react";

type ModalContextType = {
  isModalOpen: boolean;
  openModal: (title: string, content: string) => void;
  closeModal: () => void;
  modalContent: { title: string; content: string };
};

export const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
const [isModalOpen, setModalOpen] = useState(false);
const [modalContent, setModalContent ] =useState({title:"",content:" "});

  const openModal = useCallback((title: string, content: string) => {
    setModalContent({ title, content });
    setModalOpen(true);
  }, []);

   
  const closeModal = () => {
    setModalOpen(false)};

  return (
    <ModalContext.Provider value={{ isModalOpen,modalContent, openModal, closeModal}}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModal must be unded within a modalProvider");
  }

  return context;
};


