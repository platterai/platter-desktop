import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import PromptComponent from "../components/Prompt/Component";

type ChatProps = {};

export default function Chat({}: ChatProps) {
  return (
    <Box className='h-full'>
      <PromptComponent />
    </Box>
  );
}
