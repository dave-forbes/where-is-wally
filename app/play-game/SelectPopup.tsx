import { motion, AnimatePresence } from "framer-motion";
import React from "react";

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
          animate={{ opacity: opacity, height: "100px" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute bg-white w-[100px] rounded-lg overflow-hidden"
          style={{ top: `${position.y}px`, left: `${position.x}px` }}
        >
          <h1>hi</h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SelectPopup;
