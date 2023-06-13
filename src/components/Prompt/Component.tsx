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
  useDisclosure,
} from "@chakra-ui/react";
// ** ICONS **
import {
  DragHandleIcon,
  InfoIcon,
  PlusSquareIcon,
  SettingsIcon,
} from "@chakra-ui/icons";
// ---------- REDUX ----------
import { setConversationId } from "../../redux/slices/conversationIdSlice";
// ---------- CONTEXT ----------
import PageContext from "../../context/PageContext";
import UserContext from "../../context/UserContext";
// ---------- COMPONENTS ----------
import Logo from "../Logo";
import MessageComponent from "./MessageComponent";
import ChatItem from "../CustomUI/ChatItem";
import ThreeDotsBlink from "../CustomUI/loaders/ThreeDotsBlink";
// ---------- LIBRARIES ----------
import moment from "moment";
import { isEmpty, last } from "lodash";
import { AnimatePresence, motion } from "framer-motion";
import io from "socket.io-client";
// ---------- HELPERS ----------
import { requestGet, requestPost } from "../../services/baseService";
import { extractFilename, setWindowSize } from "../../util/helpers";
import { NEXT_PUBLIC_API_SOCKET } from "../../constants/env";
import {
  chatWindowCollapse,
  chatWindowExpand,
} from "../../constants/windowSizes";
import { IMessage } from "../../types/app";
import { toast } from "react-hot-toast";
import ModalInfo from "../Modal/ModalInfo";
import { text300 } from "../../@data/texts";
import ChatWrapper from "./ChatWrapper";

type PromptComponentProps = {};

type IResponseData = {
  statusCode: number;
  data: IMessage[];
};

export default function PromptComponent({}: PromptComponentProps) {
  // ---------- VARIABLES/IMPORTS ----------
  const socket = io(NEXT_PUBLIC_API_SOCKET);
  const currentDate = moment().format("YYYY-MM-DD HH:mm:ss");
  // ** REDUX
  const dispatch = useDispatch();
  const conversationId = useSelector(
    (state: any) => state.conversationId.conversationId
  );
  // ** CONTEXT
  const { setPage } = useContext(PageContext)!;
  const contextValue = useContext(UserContext) as any;
  // ** REDUX
  // ---------- STATES ----------
  const {
    isOpen: isOpenInfo,
    onOpen: onOpenInfo,
    onClose: onCloseInfo,
  } = useDisclosure();
  const [prompt, setPrompt] = useState<string>(text300);
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [fetchCount, setFetchCount] = useState<number>(1000);
  // ---------- FUNCTIONS ----------
  const fetchMessages = useCallback(async () => {
    if (isEmpty(conversationId)) return;
    const params = {
      limit: 100,
      page: 1,
      createdAt: "desc",
      conversationId,
    };
    try {
      const responseData = await requestGet<IResponseData>("/v1/messages", {
        params,
      });
      setMessages(responseData?.data);
      if (responseData?.data?.length > 0) {
        setWindowSize(chatWindowExpand.w, chatWindowExpand.h);
      }
      if (responseData?.statusCode === 401) {
        setPage("login");
      }
      if (last(responseData?.data)?.role === "ai") {
        setLoading(false);
      }
    } catch (error) {
      console.error("fetchMessages ====>", { error });
      setLoading(false);
    }
  }, [conversationId]);

  const submitPrompt = async () => {
    setTimeout(() => {
      setLoading(true);
    }, 1500);

    const newData = {
      name: currentDate,
      message: prompt.replaceAll("^&&", "[").replaceAll("&&^", "]"),
    };

    const data = {
      conversationId,
      message: prompt.replaceAll("^&&", "[").replaceAll("&&^", "]"),
    };

    try {
      const responseData = await requestPost<any>("/v1/messages", {
        data: isEmpty(conversationId) ? newData : data,
      });

      if (isEmpty(conversationId)) {
        const newConversationId = responseData.data.conversationId;
        localStorage.setItem("local_conversationId", newConversationId);
        dispatch(setConversationId(newConversationId));
      }
      setFetchCount(0);
      fetchMessages();
    } catch (error) {
      console.error("submitPrompt ====>", { error });
    }
  };

  const socketInit = useCallback(() => {
    console.log("Socket.io is initializing");
    socket.on(conversationId, async () => {
      console.log("Socket.io is triggered");
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
      if (local_conversationId) {
        dispatch(setConversationId(local_conversationId));
      }
    }
    return () => {};
  }, []);

  useEffect(() => {
    if (conversationId) {
      fetchMessages();
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationId]);

  useEffect(() => {
    if (messages?.length === 0) {
      setWindowSize(chatWindowCollapse.w, chatWindowCollapse.h);
    }
    return () => {};
  }, [messages]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (fetchCount < 6) {
      interval = setInterval(() => {
        console.log(`Manual fetch every 10 seconds`, {
          fetchCount,
          role: last(messages)?.role,
        });
        if (last(messages)?.role === "user") {
          setFetchCount((prevFetchCount) => prevFetchCount + 1);
          fetchMessages();
        } else {
          setFetchCount(999);
        }
      }, 10000);
    } else {
      if (last(messages)?.role === "user") {
        toast.error("Please try again, or refresh the page.");
      }
      setFetchCount(999);
    }

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchCount, messages]);

  // <--------------------- RENDER COMPONENT --------------------->
  // <--------------------- RENDER COMPONENT --------------------->
  // <--------------------- RENDER COMPONENT --------------------->

  return (
    <AnimatePresence>
      <motion.div
        className='h-full'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <ModalInfo
          {...{ isOpen: isOpenInfo, onOpen: onOpenInfo, onClose: onCloseInfo }}
        />
        <Box
          height={`100%`}
          width={`100%`}
          display='flex'
          flexDirection='column'
          justifyContent={`end`}
          gap={4}
        >
          {/* ================== SECTION CHAT CONVERSATION*/}
          {messages?.length > 0 && (
            <ChatWrapper {...{ messages, loading }}>
              {messages
                ?.sort((a, b) => moment(a.createdAt)?.diff(moment(b.createdAt)))
                ?.map((item: any, index: any) => {
                  return (
                    <ChatItem isUser={!isEmpty(item?.userId)} key={index}>
                      {isEmpty(item?.userId)
                        ? item.message
                        : extractFilename(item.message) ?? "No response found"}
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
            </ChatWrapper>
          )}
          {/* ================== SECTION CHAT INPUT*/}

          <InputGroup
            size='lg'
            sx={{ backgroundColor: "transparent", zIndex: 100 }}
          >
            <MessageComponent
              hasMentions={true}
              value={prompt}
              onChange={(value: any) => setPrompt(value)}
              onEnter={() => {
                submitPrompt();
                setPrompt("");
              }}
            />
            <Tooltip
              label='Drag Window'
              aria-label='Drag Window'
              placement='top'
            >
              <InputRightElement
                children={
                  <DragHandleIcon
                    sx={{ position: "relative", top: 2.5, right: 2 }}
                    cursor='grab'
                    color='blackAlpha.600'
                    data-tauri-drag-region
                  />
                }
              />
            </Tooltip>
          </InputGroup>
          {/* ================== SECTION ICONS BELOW INPUT*/}
          <HStack width='100%' justify='space-between' className='pt-2 pr-2'>
            <HStack className='bottomButtons'>
              <Tooltip
                placement='top'
                label='Settings'
                aria-label='Settings'
                hasArrow
              >
                <IconButton
                  size='sm'
                  aria-label='Settings'
                  bg='primary.1'
                  _hover={{ bg: "primary.3" }}
                  color='white'
                  icon={<SettingsIcon />}
                  type='button'
                  onClick={() => {
                    setPage("settings");
                  }}
                />
              </Tooltip>
              <Tooltip
                placement='top'
                label={`Info`}
                aria-label='Info'
                hasArrow
              >
                <IconButton
                  size='sm'
                  aria-label='Info'
                  bg='primary.1'
                  _hover={{ bg: "primary.3" }}
                  color='white'
                  icon={<InfoIcon />}
                  type='button'
                  onClick={() => {
                    onOpenInfo();
                  }}
                />
              </Tooltip>
              <Tooltip
                placement='top'
                label='New Chat'
                aria-label='New Chat'
                hasArrow
              >
                <IconButton
                  size='sm'
                  aria-label='New Chat'
                  bg='primary.1'
                  _hover={{ bg: "primary.3" }}
                  color='white'
                  icon={<PlusSquareIcon fontSize={18} />}
                  type='button'
                  onClick={() => {
                    localStorage.removeItem("local_conversationId");
                    dispatch(setConversationId(""));
                    setMessages([]);
                    setPrompt("");
                  }}
                />
              </Tooltip>
              <Button
                size='sm'
                bg='primary.1'
                _hover={{ bg: "primary.3" }}
                color='white'
                aria-label='Profile'
              >
                {contextValue?.user?.name ?? "-"}
              </Button>
              {/* </Tooltip> */}
            </HStack>

            <Logo width='80px' />
          </HStack>
        </Box>
      </motion.div>
    </AnimatePresence>
  );
}
