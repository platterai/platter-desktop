import { useState } from "react";
import { CloseIcon } from "@chakra-ui/icons";
import { Box, Tooltip, VStack } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";

type WelcomeProps = {};

export default function Welcome({}: WelcomeProps) {
  const [visible, setVisible] = useState(true);

  return (
    <Box>
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
          >
            <Box
              sx={{
                bgColor: "white",
                color: "var(--n-6)",
                borderRadius: "8px",
                padding: "24px 32px",
              }}
            >
              <VStack align={"start"} gap={4}>
                <p className='text-3xl font-semibold'>Welcome to Platter AI</p>
                <p>
                  Use the bar below to interact with Platter. This window can be
                  toggled at any time using the shortcut Ctrl+Shift+/ or
                  Cmd+Shift+/ (on Mac).
                </p>
              </VStack>
              <Tooltip label='Close' aria-label='Close' hasArrow>
                <CloseIcon
                  style={{
                    cursor: "pointer",
                    position: "absolute",
                    top: "24px",
                    right: "24px",
                  }}
                  onClick={() => {
                    setVisible(false);
                  }}
                />
              </Tooltip>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}
