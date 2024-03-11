import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import Image from "next/image";
import wallyIcon from "../../public/wallyico.png";

interface SelectPopupProps {
  opacity: number;
  position: { x: number; y: number };
}

const SelectPopup = ({ opacity, position }: SelectPopupProps) => {
  return (
    <AnimatePresence>
      {opacity > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: opacity, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute bg-white p-3 rounded-lg overflow-hidden flex flex-col justify-center items-center gap-2"
          style={{ top: `${position.y}px`, left: `${position.x}px` }}
        >
          <Image src={wallyIcon} alt={""} className="w-16 h-16" />
          <button className="bg-black text-white rounded-lg p-2">
            Confirm target?
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SelectPopup;
