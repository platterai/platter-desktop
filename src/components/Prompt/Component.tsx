// ---------- REACT/NEXT/TAURI ----------
import { useCallback, useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// ---------- STYLE ----------
import {
  Box,
  Button,
  Grid,
  GridItem,
  HStack,
  IconButton,
  InputGroup,
  InputRightElement,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
// ** ICONS **
import {
  DeleteIcon,
  DragHandleIcon,
  PlusSquareIcon,
  RepeatClockIcon,
  SettingsIcon,
} from "@chakra-ui/icons";
// ---------- REDUX ----------
import {
  setConversationId,
  setConversations,
} from "../../slices/conversationIdSlice";
// ---------- CONTEXT ----------
import PageContext from "../../context/PageContext";
import UserContext from "../../context/UserContext";
// ---------- COMPONENTS ----------
import Logo from "../Logo";
import MessageComponent from "./MessageComponent";
import ChatItem from "../CustomUI/ChatItem";
// ---------- LIBRARIES ----------
import moment from "moment";
import { isEmpty } from "lodash";
import { AnimatePresence, motion } from "framer-motion";
import io from "socket.io-client";
// ---------- HELPERS ----------
import { requestGet, requestPost } from "../../services/baseService";
import { setWindowSize } from "../../util/helpers";
import ThreeDotsBlink from "../CustomUI/loaders/ThreeDotsBlink";

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
        if (showHistory) {
          setWindowSize(980, 840);
        } else {
          setWindowSize(800, 840);
        }
      }
      if (responseData?.statusCode === 401) {
        setPage("login");
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

  // <--------------------- RENDER COMPONENT --------------------->
  // <--------------------- RENDER COMPONENT --------------------->
  // <--------------------- RENDER COMPONENT --------------------->

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Grid
          className='w-full'
          templateColumns={showHistory ? "repeat(4, 1fr)" : "repeat(3, 1fr)"}
          gap={6}
        >
          <GridItem colSpan={3}>
            <Box
              width={`100%`}
              display='flex'
              flexDirection='column'
              justifyContent={`end`}
            >
              {/* ================== SECTION CHAT CONVERSATION*/}
              <div
                style={{
                  maxHeight: "420px",
                  width: "100%",
                  overflowY: "scroll",
                  paddingBottom: "100px",
                }}
                className='flex flex-col gap-8 no-scrollbar'
              >
                {messages
                  ?.sort((a, b) =>
                    moment(a.createdAt)?.diff(moment(b.createdAt))
                  )
                  ?.map((item: any, index: any) => {
                    return (
                      <ChatItem isUser={!isEmpty(item?.userId)} key={index}>
                        {item.message ?? "No response found"}
                      </ChatItem>
                    );
                  })}
                {loading ? (
                  <ChatItem isUser={false}>
                    <ThreeDotsBlink />
                  </ChatItem>
                ) : (
                  <></>
                )}
                {/* <ChatItem isUser={false}>
                  <BarChart />
                  <PlotlyComponent />
                </ChatItem> */}
              </div>
              {/* ================== SECTION CHAT INPUT*/}
              <InputGroup
                size='lg'
                sx={{ backgroundColor: "transparent", zIndex: 100 }}
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
                <Tooltip
                  label='Drag Window'
                  aria-label='Drag Window'
                  placement='top'
                >
                  <InputRightElement
                    children={
                      <DragHandleIcon
                        sx={{ position: "relative", top: 1, right: 1 }}
                        cursor='grab'
                        color='blackAlpha.600'
                        data-tauri-drag-region
                      />
                    }
                  />
                </Tooltip>
              </InputGroup>
              {/* ================== SECTION ICONS BELOW INPUT*/}
              <HStack
                width='100%'
                justify='space-between'
                className='pt-2 pr-2'
              >
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
                      icon={<DeleteIcon />}
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
                            setWindowSize(800, 840);
                          } else {
                            setWindowSize(800, 840);
                          }
                        } else if (showHistory === false) {
                          setShowHistory(true);

                          if (messages?.length < 1) {
                            setWindowSize(980, 840);
                          } else {
                            setWindowSize(980, 840);
                          }
                        }
                      }}
                    />
                  </Tooltip>
                  {/* <Tooltip
                    label={`Open profile ${contextValue?.user?.name ?? "??"}`}
                    aria-label={`Open profile ${
                      contextValue?.user?.name ?? "??"
                    }`}
                    hasArrow
                  > */}
                  <Button
                    size='sm'
                    bg='primary.1'
                    _hover={{ bg: "primary.3" }}
                    color='white'
                    aria-label='Profile'
                    onClick={() => {
                      // setShowOptions(!showOptions);
                      // setPage("profile");
                    }}
                  >
                    {contextValue?.user?.name ?? "-"}
                  </Button>
                  {/* </Tooltip> */}
                </HStack>

                <Logo width='80px' />
              </HStack>
              {/* ================== SECTION CHAT HISTORY*/}
            </Box>
          </GridItem>
          {showHistory ? (
            <GridItem colSpan={1} className='w-full h-full'>
              <motion.div
                className='w-full h-full'
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
              >
                <Box
                  sx={{
                    bgColor: "white",
                    color: "var(--n-6)",
                    borderRadius: "12px",
                    padding: "20px",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <p className='text-xl font-bold mb-4'>Chat History</p>
                  <VStack alignItems={`start`}>
                    {conversations?.length > 0 ? (
                      conversations?.map((item: any, index: any) => {
                        const time = moment(item?.createdAt).format(
                          "DD MMM'YY, HH:mm"
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
              </motion.div>
            </GridItem>
          ) : (
            <></>
          )}
        </Grid>
      </motion.div>
    </AnimatePresence>
  );
}
