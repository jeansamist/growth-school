"use client";
import { AnimatePresence, motion } from "motion/react";
import { FunctionComponent, useEffect, useState } from "react";

export type CommentsProps = {
  testimonials: { name: string; message: string }[];
};

export const Comments: FunctionComponent<CommentsProps> = ({
  testimonials,
}) => {
  const [index, setIndex] = useState<number>(0);
  const [paused, setpaused] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) {
        if (index < testimonials.length - 1) {
          setIndex(index + 1);
        } else {
          setIndex(0);
        }
      }
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [testimonials, index, paused]);
  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-20"
      >
        <div className="leading-normal text-black/70 text-justify">
          <b>{testimonials[index].name} : </b>
          {testimonials[index].message}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
