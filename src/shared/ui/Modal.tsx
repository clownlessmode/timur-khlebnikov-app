"use client";
import React, { useEffect } from "react";
import { motion, AnimatePresence, HTMLMotionProps } from "framer-motion";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          {...({
            className:
              "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 overflow-y-auto",
          } as HTMLMotionProps<"div">)}
          {...({
            onClick: onClose,
          } as HTMLMotionProps<"button">)}
          // className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 overflow-y-auto"
          // onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <motion.div
            {...({
              className:
                "relative bg-background w-full max-w-md my-auto rounded-md border border-border",
            } as HTMLMotionProps<"div">)}
            // className="relative bg-background w-full max-w-md my-auto rounded-md border border-border"
            // onClick={(e) => e.stopPropagation()}
            {...({
              onClick: (e: any) => e.stopPropagation(),
            } as HTMLMotionProps<"button">)}
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
            }}
            transition={{
              type: "tween",
              duration: 0.15,
              ease: "easeInOut",
            }}
          >
            <motion.button
              {...({
                className:
                  "absolute top-5 right-5 text-2xl text-muted-foreground z-10",
              } as HTMLMotionProps<"div">)}
              {...({
                onClick: onClose,
              } as HTMLMotionProps<"button">)}
              // className="absolute top-5 right-5 text-2xl text-muted-foreground z-10"
              // onClick={onClose}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
            >
              <X size={16} />
            </motion.button>

            <div className="p-4 overflow-y-auto">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
