import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import wallypic from "../../public/wallypic.png";
import odlawpic from "../../public/odlawpic.jpeg";
import wizardpic from "../../public/wizardpic.png";
import Target from "./Target";
import { useGlobalContext } from "../Context/global";

interface SelectPopupProps {
  cursorPosition: { x: number; y: number };
}

const SelectPopup = ({ cursorPosition }: SelectPopupProps) => {
  const { popupOpacity } = useGlobalContext();
  return (
    <AnimatePresence>
      {popupOpacity > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: popupOpacity, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute bg-white p-3 rounded-lg overflow-hidden flex flex-col justify-center items-center gap-2"
          style={{
            top: `${cursorPosition.y}px`,
            left: `${cursorPosition.x}px`,
          }}
        >
          <p>Confirm Target</p>
          <div className="flex gap-3 items-baseline">
            <Target src={wallypic} character={"wally"} />
            <Target src={odlawpic} character={"odlaw"} />
            <Target src={wizardpic} character={"wizard"} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SelectPopup;
