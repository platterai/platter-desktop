// ---------- REACT/NEXT/TAURI ----------
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { listen } from "@tauri-apps/api/event";
import { invoke } from "@tauri-apps/api";
// ---------- STYLE ----------
import {
  Box,
  BoxProps,
  Button,
  HStack,
  IconButton,
  InputGroup,
  InputRightElement,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
// ** ICONS **
import { DragHandleIcon, SettingsIcon } from "@chakra-ui/icons";
// ---------- CONTEXT ----------
import PageContext from "../../context/PageContext";
// ---------- COMPONENTS ----------
import MessageComponent from "./MessageComponent";
// ---------- HELPERS ----------
import { toast } from "react-hot-toast";
import { isEmpty, last } from "lodash";
import { requestGet, requestPost } from "../../services/baseService";
import moment from "moment";

export default function PromptComponent({
  token,
  onGenerate = () => {},
  onClear = () => {},
  isLoading = false,
  ...props
}: {
  onGenerate?: (prompt: string, temperature: number) => void;
  onClear?: () => void;
  token: string;
  isLoading?: boolean;
} & BoxProps) {
  const { setPage } = useContext(PageContext)!;

  const [prompt, setPrompt] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [listUsers, setListUsers] = useState<User[]>([]);
  const [listFiles, setListFiles] = useState<File[]>([]);

  const inputRef = useRef<any>(null);

  interface UserOrg {
    division?: {
      organizationId?: string;
    };
  }

  const [valueInput, setValueInput] = useState<string>();
  interface User {
    id: string | number;
    display: string;
    [key: string]: any;
  }
  interface File {
    id: string | number;
    display: string;
    [key: string]: any;
  }

  useEffect(() => {
    const unlisten = listen("show", (e) => {
      inputRef.current?.focus();
    });

    return () => {
      unlisten.then((unlisten) => unlisten());
    };
  }, []);

  const openSettingsPopup = () => {
    invoke("open_settings");
  };

  const inputRef2 = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (inputRef2.current) {
      inputRef2.current.style.setProperty("height", "auto", "important");
    }
  }, []);
  const currentDate = moment().format("YYYY-MM-DD HH:mm:ss");
  const conversationId = localStorage.getItem("conversationId");

  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<any[]>([]);

  const fetchMessages = useCallback(async () => {
    const params = {
      limit: 100,
      page: 1,
      conversationId,
    };
    try {
      const responseData = await requestGet<any>("/v1/messages", {
        params,
        token,
      });
      // nanti set messagesnya disini:
      // setMessages((prevMessages) => [...prevMessages, responseData]);
      console.log("fetchMessages()", { responseData });
      setMessages(responseData?.data);
    } catch (error) {
      console.error("fetchMessages()", { error });
    }
  }, [conversationId, token]);

  const submitPrompt = async () => {
    setTimeout(() => {
      setLoading(true);
    }, 1500);
    setTimeout(() => {
      setLoading(false);
      if (!isEmpty(last(messages)?.userId)) {
        toast.error("Request Timeout");
        setMessages((prevMessages) => [
          ...prevMessages,
          { userId: null, message: "Request Timeout" },
        ]);
      }
    }, 60000);
    const newData = {
      name: currentDate,
      message: prompt,
    };

    const data = {
      conversationId,
      message: prompt,
    };

    console.log("submitPrompt", {
      data: isEmpty(conversationId) ? newData : data,
      token,
    });

    try {
      const responseData = await requestPost<any>("/v1/messages", {
        data: isEmpty(conversationId) ? newData : data,
        token,
      });

      if (isEmpty(conversationId)) {
        // router.replace(`/chat?id=${responseData.data.conversationId}`);
      }
      fetchMessages();
      console.log("submitPrompt()", { responseData });
    } catch (error) {
      console.error("submitPrompt()", { error });
    }
  };

  return (
    <Box display='flex' flexDirection='column' {...props}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          //   onGenerate(prompt.trim(), temperature);
          setPrompt("");
        }}
      >
        <VStack align={"start"}>
          <InputGroup
            size='lg'
            sx={{
              borderColor: "black",
              backgroundColor: "transparent",
              zIndex: 100,
            }}
          >
            <MessageComponent
              value={prompt}
              onChange={(value: any) => setPrompt(value)}
              onEnter={() => {
                submitPrompt();
                setPrompt("");
              }}
              token={token}
              hasMentions={true}
            />
            <InputRightElement
              children={
                <DragHandleIcon
                  cursor='grab'
                  color='blackAlpha.600'
                  data-tauri-drag-region
                />
              }
            />
          </InputGroup>
          <HStack className='bottomButtons'>
            <Tooltip label='Settings' aria-label='Settings' hasArrow>
              <IconButton
                size='sm'
                aria-label='Settings'
                colorScheme='blue'
                color='white'
                icon={<SettingsIcon />}
                type='button'
                onClick={() => {
                  openSettingsPopup();
                  setPage("settings");
                }}
              />
            </Tooltip>
            <Tooltip label='Profile' aria-label='Profile' hasArrow>
              <Button
                size='sm'
                colorScheme='blue'
                color='white'
                aria-label='Profile'
                onClick={() => {
                  // setShowOptions(!showOptions);
                  setPage("profile");
                }}
              >
                Lintang
              </Button>
            </Tooltip>
          </HStack>
        </VStack>
      </form>
    </Box>
  );
}
