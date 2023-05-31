// ---------- REACT/NEXT/TAURI ----------
import { useCallback, useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// ---------- STYLE ----------
import {
  Box,
  Button,
  HStack,
  IconButton,
  InputGroup,
  InputRightElement,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
// ** ICONS **
import {
  DragHandleIcon,
  PlusSquareIcon,
  QuestionOutlineIcon,
  RepeatClockIcon,
  SettingsIcon,
} from "@chakra-ui/icons";
// ---------- CONTEXT ----------
import PageContext from "../../context/PageContext";
import UserContext from "../../context/UserContext";
// ---------- COMPONENTS ----------
import MessageComponent from "./MessageComponent";
import Logo from "../Logo";
// ---------- LIBRARIES ----------
import moment from "moment";
import { isEmpty, last } from "lodash";
import { AnimatePresence, motion } from "framer-motion";
import io from "socket.io-client";
// ---------- HELPERS ----------
import { requestGet, requestPost } from "../../services/baseService";
import {
  setConversationId,
  setConversations,
} from "../../slices/conversationIDSlice";
import { setWindowSize } from "../../util/helpers";
import ChatItem from "../CustomUI/ChatItem";

type PromptComponentProps = {
  token: string;
};

export default function PromptComponent({ token }: PromptComponentProps) {
  // ---------- VARIABLES/IMPORTS ----------
  const socket = io("http://54.254.188.38:9002");
  const currentDate = moment().format("YYYY-MM-DD HH:mm:ss");
  // ** REDUX
  const dispatch = useDispatch();
  const conversationId = useSelector(
    (state: any) => state.conversationId.conversationId
  );
  const conversations = useSelector(
    (state: any) => state.conversationId.conversations
  );
  console.log({ conversationId, conversations });
  // ** CONTEXT
  const { setPage } = useContext(PageContext)!;
  const contextValue = useContext(UserContext) as any;
  // ** REDUX
  // ---------- STATES ----------
  const [prompt, setPrompt] = useState<string>("");
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<any[]>([]);
  // ---------- FUNCTIONS ----------
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
      if (responseData?.data?.length > 0) {
        setWindowSize(800, 600);
      }
    } catch (error) {
      console.error("fetchMessages()", { error });
    }
  }, [conversationId, token]);

  const submitPrompt = async () => {
    setTimeout(() => {
      setLoading(true);
    }, 1500);
    const newData = {
      name: currentDate,
      message: prompt,
    };

    const data = {
      conversationId,
      message: prompt,
    };

    try {
      const responseData = await requestPost<any>("/v1/messages", {
        data: isEmpty(conversationId) ? newData : data,
        token,
      });

      if (isEmpty(conversationId)) {
        localStorage.setItem(
          "local_conversationId",
          responseData.data.conversationId
        );
        localStorage.setItem(
          "local_conversations",
          JSON.stringify([
            ...conversations,
            {
              conversationId: responseData.data.conversationId,
              createdAt: responseData.data.createdAt,
            },
          ])
        );
        dispatch(setConversationId(responseData.data.conversationId));
        dispatch(
          setConversations([
            ...conversations,
            {
              conversationId: responseData.data.conversationId,
              createdAt: responseData.data.createdAt,
            },
          ])
        );
      }
      fetchMessages();
      console.log({ responseData });
    } catch (error) {
      console.error({ error });
    }
  };

  const socketInit = useCallback(() => {
    console.log("Socket.io is initializing");
    socket.on(conversationId, async () => {
      console.log("Socket.io is triggered");
      setLoading(false);
      fetchMessages();
    });
  }, [fetchMessages, conversationId]);
  // ---------- EFFECTS ----------
  useEffect(() => {
    socketInit();
    return () => {};
  }, [socketInit]);

  useEffect(() => {
    if (conversationId === "") {
      const local_conversationId = localStorage.getItem("local_conversationId");
      const local_conversations = localStorage.getItem("local_conversations");
      if (local_conversationId) {
        dispatch(setConversationId(local_conversationId));
      }
      if (local_conversations) {
        dispatch(setConversations(JSON.parse(local_conversations)));
      }
    }

    return () => {};
  }, []);

  useEffect(() => {
    console.log("messages state changes:", {
      conversationId,
      conversations,
      messages,
    });
    if (conversationId) {
      fetchMessages();
    } else {
      setMessages([]);
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationId, conversations]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Box display='flex' flexDirection='column'>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setPrompt("");
            }}
          >
            <VStack align={"start"}>
              <div
                style={{ maxHeight: "300px", overflowY: "scroll" }}
                className='no-scrollbar'
              >
                {messages
                  ?.sort((a, b) =>
                    moment(a.createdAt)?.diff(moment(b.createdAt))
                  )
                  ?.map((item: any, index: any) => {
                    return (
                      <ChatItem isUser={!isEmpty(item?.userId)} key={index}>
                        {item.message}
                      </ChatItem>
                    );
                  })}
              </div>

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
              <HStack width='100%' justify='space-between'>
                <HStack className='bottomButtons'>
                  <Tooltip label='Settings' aria-label='Settings' hasArrow>
                    <IconButton
                      size='sm'
                      aria-label='Settings'
                      bg='primary.1'
                      _hover={{ bg: "primary.3" }}
                      color='white'
                      icon={<SettingsIcon />}
                      type='button'
                      onClick={() => {
                        // openSettingsPopup();
                        setPage("settings");
                      }}
                    />
                  </Tooltip>
                  <Tooltip label='New Chat' aria-label='New Chat' hasArrow>
                    <IconButton
                      size='sm'
                      aria-label='New Chat'
                      bg='accent.6'
                      _hover={{ bg: "accent.7" }}
                      color='white'
                      icon={<PlusSquareIcon fontSize={16} color='n.6' />}
                      type='button'
                      onClick={() => {
                        localStorage.removeItem("local_conversationId");
                        dispatch(setConversationId(""));
                      }}
                    />
                  </Tooltip>
                  <Tooltip
                    label='Reset History'
                    aria-label='Reset History'
                    hasArrow
                  >
                    <IconButton
                      size='sm'
                      aria-label='Reset History'
                      bg='accent.1'
                      _hover={{ bg: "accent.8" }}
                      color='white'
                      icon={<QuestionOutlineIcon />}
                      type='button'
                      onClick={() => {
                        localStorage.removeItem("local_conversationId");
                        localStorage.removeItem("local_conversations");
                        dispatch(setConversationId(""));
                        dispatch(setConversations([]));
                      }}
                    />
                  </Tooltip>
                  <Tooltip
                    label='Chat History'
                    aria-label='Chat History'
                    hasArrow
                  >
                    <IconButton
                      size='sm'
                      aria-label='Chat History'
                      bg='primary.1'
                      _hover={{ bg: "primary.3" }}
                      color='white'
                      icon={<RepeatClockIcon />}
                      type='button'
                      onClick={() => {
                        if (showHistory === true) {
                          setShowHistory(false);
                          if (messages?.length < 1) {
                            setWindowSize(800, 280);
                          } else {
                            setWindowSize(800, 640);
                          }
                        } else if (showHistory === false) {
                          setShowHistory(true);

                          if (messages?.length < 1) {
                            setWindowSize(800, 640);
                          } else {
                            setWindowSize(800, 840);
                          }
                        }
                      }}
                    />
                  </Tooltip>
                  <Tooltip
                    label={`Open profile ${contextValue?.user?.name ?? "??"}`}
                    aria-label={`Open profile ${
                      contextValue?.user?.name ?? "??"
                    }`}
                    hasArrow
                  >
                    <Button
                      size='sm'
                      bg='primary.1'
                      _hover={{ bg: "primary.3" }}
                      color='white'
                      aria-label='Profile'
                      onClick={() => {
                        // setShowOptions(!showOptions);
                        setPage("profile");
                      }}
                    >
                      {contextValue?.user?.name ?? "-"}
                    </Button>
                  </Tooltip>
                </HStack>

                <Logo width='80px' />
              </HStack>

              {showHistory ? (
                <Box
                  sx={{
                    bgColor: "white",
                    color: "var(--n-6)",
                    borderRadius: "8px",
                    padding: "24px 32px",
                    width: "100%",
                    height: "360px",
                    maxHeight: "360px",
                  }}
                >
                  <p className='h6 font-bold mb-4'>Chat History</p>
                  <VStack alignItems='start'>
                    {conversations?.length > 0 ? (
                      conversations?.map((item: any, index: any) => {
                        const time = moment(item?.createdAt).format(
                          "ddd : DD MMM YYYY, HH:mm"
                        );
                        return (
                          <button
                            onClick={() => {
                              console.log("click history");
                              dispatch(setConversationId(item?.conversationId));
                            }}
                            style={{ cursor: "pointer" }}
                            key={index}
                          >
                            {time}
                          </button>
                        );
                      })
                    ) : (
                      <p>No history</p>
                    )}
                  </VStack>
                </Box>
              ) : (
                <></>
              )}
            </VStack>
          </form>
        </Box>
      </motion.div>
    </AnimatePresence>
  );
}
