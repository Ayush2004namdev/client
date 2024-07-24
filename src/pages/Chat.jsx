import { useInfiniteScrollTop } from "6pp";
import { AttachFile, Send as SendIcon } from "@mui/icons-material";
import { IconButton, Stack, Tooltip } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FileMenu from "../components/dialoges/FileMenu";
import AppLayout from "../components/layout/AppLayout";
import Messages from "../components/Shared/Messages";
import { ChatInput } from "../components/styles/VisuallyHiddenComponent";
import { NEW_MESSAGE, TYPING_END, TYPING_START } from "../constants/Constant";
import { useChatDetailsQuery, useGetMessagesQuery } from "../redux/api/api";
import { setIsFileMenu } from "../redux/slices/misc";
import { getSocket } from "../Socket";
import { MessageLoader } from "../components/layout/Loaders";
import { orange } from "../constants/Color";
import { useErrors } from "../hooks/Hook";

const Chat = () => {
  const { chatId } = useParams();
  const chatIdRef = useRef(chatId); 
  const containerRef = useRef(null);
  const { user } = useSelector((state) => state.user);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(1);
  const [fileMenuAnchor, setIsFileMenuAnchor] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const timeOutRef = useRef(null);
  const bottomRef = useRef(null);
  const socket = getSocket();
  const getChatDetails = useChatDetailsQuery({ chatId });
  const members = getChatDetails?.data?.chats?.members;
  const dispatch = useDispatch();
  const { data, isError, isLoading, error, refetch } = useGetMessagesQuery({
    chatId,
    page,
  });

  useErrors([{
    isError,
    error
  }])

  if (bottomRef.current) {
    bottomRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const { data: infiniteScrollData, setData: setInfiniteScrollData } =
    useInfiniteScrollTop(containerRef,data?.pages, page,setPage, data?.message);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setUserTyping(false);
    socket.emit(NEW_MESSAGE, { chatId, message, members });
    setMessage("");
  };

  const newMessage = useCallback((data) => {
    if (data.chatId !== chatIdRef.current) return;
    setMessages((prev) => [...prev, data.message]);
  }, []);

  const typingStartHandler = useCallback((data) => {
    if (chatIdRef.current !== data.chatId || user._id === data.user) return;
    setUserTyping(true);
  }, [chatId, user]);

  const typingEndHandler = useCallback((data) => {
    if (chatIdRef.current !== data.chatId || user._id === data.user) return;
    setUserTyping(false);
  }, [chatId, user]);

  useEffect(() => {
    socket.on(TYPING_START, typingStartHandler);
    socket.on(TYPING_END, typingEndHandler);
    return () => {
      socket.off(TYPING_START, typingStartHandler);
      socket.off(TYPING_END, typingEndHandler);
    };
  }, [typingStartHandler, typingEndHandler]);

  useEffect(() => {
    socket.on(NEW_MESSAGE, newMessage);
    chatIdRef.current = chatId;
    return () => {
      socket.off(NEW_MESSAGE, newMessage);
      setMessages([]);
      setMessage('');
      setPage(1);
      setInfiniteScrollData([]);
    };
  }, [chatId, newMessage, socket]);

  const allMessage = [...infiniteScrollData, ...messages];

  const handleFileOpen = (e) => {
    dispatch(setIsFileMenu(true));
    setIsFileMenuAnchor(e.target);
  };

  const handleMessageInput = (e) => {
    setMessage(e.target.value);
    if (!isTyping) {
      setIsTyping(true);
      socket.emit(TYPING_START, { members, chatId, user: user._id });
    }

    if (timeOutRef.current) clearTimeout(timeOutRef.current);
    timeOutRef.current = setTimeout(() => {
      socket.emit(TYPING_END, { members, chatId, user: user._id });
      setIsTyping(false);
    }, 2000);
  };

  return (
    <>
      <div style={{ height: '100%', overflow:'hidden' }}>
        <Stack
          ref={containerRef}
          height={"90%"}
          width={"100%"}
          padding={"1rem"}
          spacing={"1rem"}
          boxSizing={"border-box"}
          bgcolor={"#D3D3D3"}
          sx={{
            overflowX: "hidden",
            overflowY: "auto",
          }}
        >
          {allMessage &&
            allMessage.map((message, index) => {
              return <Messages message={message} key={index} />;
            })}
          {userTyping && <MessageLoader />}
          <div ref={bottomRef} />
        </Stack>
        <form onSubmit={handleSendMessage} style={{ height: "10%", width: '100%' }}>
          <Stack
            height={"100%"}
            alignItems={"center"}
            direction={"row"}
            spacing={"1rem"}
            width={"100%"}
            padding={"0.2rem"}
          >
            <Tooltip title={"Attach File"}>
              <IconButton onClick={handleFileOpen}>
                <AttachFile />
              </IconButton>
            </Tooltip>
            <ChatInput
              placeholder={"Type a message"}
              value={message}
              onChange={handleMessageInput}
            />
            {/* <Tooltip title={"send"}>
              <IconButton
                sx={{
                  backgroundColor: "#3f51b5",
                  p: "0.5rem",
                  rotate: "-35deg",
                }}
                type="submit"
              >
                <Send />
              </IconButton>
            </Tooltip> */}

              <Tooltip>
                <IconButton sx={{
                  marginRight:'2px',
                  bgcolor: orange,
                  transform: 'rotate(-35deg)',
                }}
                type="submit">
                  <SendIcon/>
                </IconButton>
              </Tooltip>

          </Stack>
          <FileMenu anchorEl={fileMenuAnchor} chatId={chatId} />
        </form>
      </div>
    </>
  );
};

export default AppLayout()(Chat);
