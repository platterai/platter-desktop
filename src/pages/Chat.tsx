import { Box } from "@chakra-ui/react";
import { useContext } from "react";
import PromptComponent from "../components/Prompt/Component";
import PageContext from "../context/PageContext";

type ChatProps = {};

export default function Chat({}: ChatProps) {
  const context = useContext(PageContext);
  return (
    <Box>
      <PromptComponent token={context?.token ?? ""} />
    </Box>
  );
}
