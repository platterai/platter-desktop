import React, { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";
type ChatWrapperProps = {
  messages?: any;
  loading?: boolean;
  hasContent?: boolean;
  children: React.ReactNode;
};

export default function ChatWrapper({
  messages,
  loading,
  hasContent = true,
  children,
}: ChatWrapperProps) {
  const chatContainerRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the chat container
    //@ts-ignore
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messages, loading]);

  const colormode = useSelector((state: any) => state?.colormode?.colormode);

  return (
    <motion.div
      className={`h-full ${
        colormode === "dark" ? "bg-n-6 text-n-1" : "bg-white text-n-7"
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        borderRadius: "8px",
        overflowY: "hidden",
        padding: "20px",
        flexGrow: "1",
      }}
    >
      <div
        style={{
          height: "100%",
          width: "100%",
          overflowY: "scroll",
          paddingBottom: hasContent ? "60px" : "0px",
        }}
        className='flex flex-col gap-8 no-scrollbar'
        ref={chatContainerRef}
      >
        {children}
      </div>
    </motion.div>
  );
}
