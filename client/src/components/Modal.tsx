import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { FaTimes } from "react-icons/fa";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="absolute inset-0" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 100,
          delay: 0.1,
        }}
        className="relative z-10 bg-base-100 p-6 rounded-lg shadow-lg w-full max-w-md mx-4"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white-500 hover:text-gray-700"
        >
          <FaTimes />
        </button>
        {children}
      </motion.div>
    </div>
  );
};

export default Modal;
