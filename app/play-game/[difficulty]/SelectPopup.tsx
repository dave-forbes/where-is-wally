import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import Image from "next/image";
import wallypic from "../../../public/wallypic.png";
import odlawpic from "../../../public/odlawpic.jpeg";
import wizardpic from "../../../public/wizardpic.png";
import Target from "./Target";

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
          <p>Confirm Target</p>
          <div className="flex gap-3 items-baseline">
            <Target src={wallypic} />
            <Target src={odlawpic} />
            <Target src={wizardpic} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SelectPopup;
