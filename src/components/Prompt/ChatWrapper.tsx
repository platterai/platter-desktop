import React, { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
type ChatWrapperProps = {
  messages?: any;
  loading?: boolean;
  children: React.ReactNode;
};

export default function ChatWrapper({
  messages,
  loading,
  children,
}: ChatWrapperProps) {
  const chatContainerRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the chat container
    //@ts-ignore
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messages, loading]);

  return (
    <motion.div
      className='h-full'
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        backgroundColor: "white",
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
          padding: "20px 0px",
        }}
        className='flex flex-col gap-8 no-scrollbar'
        ref={chatContainerRef}
      >
        {children}
      </div>
    </motion.div>
  );
}
