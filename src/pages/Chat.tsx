// ---------- REACT/NEXT/TAURI ----------
import { useContext, useEffect, useState } from "react";
// ---------- STYLE ----------
import { Box, Button, Center, VStack } from "@chakra-ui/react";
// ** ICONS **
import { NotAllowedIcon, RepeatIcon } from "@chakra-ui/icons";
// ---------- CONTEXT ----------
import PageContext from "../context/PageContext";
// ---------- COMPONENTS ----------
import ResponseBox from "../components/ResponseBox";
import UnauthorizedErrorBox from "../components/UnauthorizedErrorBox";
import ErrorBox from "../components/ErrorBox";
import PromptBox from "../components/PromptBox";
import ConfirmationBox from "../components/ConfirmationBox";
import PromptComponent from "../components/Prompt/Component";
import Welcome from "../components/Prompt/Welcome";
// ---------- HOOKS ----------
import useChatLog, { ChatMessage } from "../util/hooks/useChatLog";
// ---------- HELPERS ----------
import { isEmpty } from "lodash";
import { AnimatePresence, motion } from "framer-motion";
import { chatComplete } from "../util/openai";
import { setWindowSize } from "../util/helpers";
import { useSelector } from "react-redux";

export default function ChatPage() {
  // ---------- VARIABLES/IMPORTS ----------
  // ** CONTEXT
  const showWelcome = useSelector(
    (state: any) => state.showWelcome.showWelcome
  );
  console.log({ showWelcome });
  // ** CONTEXT
  const { setPage, token } = useContext(PageContext)!;
  // ** HOOKS
  const { chatLog, addPrompt, addResponse, clearChatLog, popChatLog } =
    useChatLog();
  // ---------- STATES ----------

  const [userData, setUserData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [tempPrompt, setTempPrompt] = useState<string>("");
  const [tempFiles, setTempFiles] = useState<any>([]);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [bgClicked, setBgClicked] = useState(false);

  const [error, setError] = useState<Error | null>(null);
  // ---------- FUNCTIONS ----------
  const handleBgClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target !== e.currentTarget) {
      return;
    }

    setBgClicked(true);
    setTimeout(() => {
      setBgClicked(false);
    }, 200);
  };

  const handleClearChatLog = () => {
    clearChatLog();
    setError(null);
    setShowConfirmation(false);
  };

  const handleGenerate = async (prompt: string, temperature = 1.0) => {
    console.log("prompt", prompt);
    if (prompt) {
      const chatHistory: ChatMessage[] = [
        ...chatLog,
        { type: "prompt", text: prompt },
      ];

      setError(null);
      addPrompt(prompt);
      setIsLoading(true);
      setShowConfirmation(false);

      try {
        const response = await chatComplete({
          chat: chatHistory,
          onChunk(chunk) {},
          apiParams: {
            temperature,
          },
        });

        addResponse(response);
      } catch (e) {
        if (e instanceof Error) {
          setError(e);
        }
        console.log(e);
      }

      setIsLoading(false);
    }
  };

  const handleConfirmation = async (prompt: string, temperature = 1.0) => {
    if (prompt) {
      const str = prompt;
      const regex = /#\(([^[]+)\[[^\]]+\]\)/g;
      const matches = [];
      let match;
      while ((match = regex.exec(str)) !== null) {
        matches.push(match[1]);
      }
      console.log(matches);
      if (matches && matches?.length !== 0) {
        setTempPrompt(prompt);
        setTempFiles(matches);
        // addPrompt(prompt);
        setShowConfirmation(true);
      } else {
        handleGenerate(prompt, temperature);
      }
    }
  };

  const handleCancelConfirmation = async () => {
    setShowConfirmation(false);
    setTempPrompt("");
    setTempFiles([]);
  };
  // ---------- EFFECTS ----------
  useEffect(() => {
    setWindowSize(800, 400);
    const user: any = localStorage.getItem("user");
    if (!isEmpty(user)) {
      setUserData(JSON.parse(user));
      console.log("masuk chat page", { user: JSON.parse(user) });
    } else {
      setPage("login");
    }
    return () => {};
  }, []);
  // ---------- COMPONENTS ----------
  // ---------- CUSTOM STYLING ----------
  // ---------- APIs ----------
  // ---------- COMPONENT PROPS ----------

  return (
    <Box
      display='flex'
      flexDirection='column'
      bg='none'
      transition='background-color 0.1s ease'
      rounded='md'
      gap={4}
    >
      {showWelcome ? <Welcome /> : <></>}

      <PromptComponent
        token={token}
        onGenerate={handleConfirmation}
        // onClear={() => {
        //   handleClearChatLog();
        //   setShowConfirmation(false);
        // }}
        isLoading={isLoading}
        mb={2}
      />
    </Box>
  );
}
