import { Box, Drawer, Grid, Skeleton } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { NEW_MESSAGE_ALERT, NEW_REQUEST, REFETCH_CHATS } from "../../constants/Constant";
import { useErrors, useSocketEvents } from "../../hooks/Hook";
import { useMyChatsQuery } from "../../redux/api/api";
import { notificationCountIncrement, setMessageCount } from "../../redux/slices/chat";
import { setIsMobile } from "../../redux/slices/misc";
import { getSocket } from "../../Socket";
import Profile from "../Shared/Profile";
import Title from "../Shared/Title";
import ChatLayout from "./ChatLayout";
import Header from "./Header";
import { getOrSaveFromLocalStorage } from "../../lib/features";

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const dispatch = useDispatch();
    const params = useParams();
    const {newMessageAlert} = useSelector((state) => state.chat)
    const { chatId } = params;
    const chatIdRef = useRef(chatId);
    const { isLoading, isError, data, error, refetch } = useMyChatsQuery("");
    const [chats, setChats] = useState([]);
    const {isMobile} = useSelector(state => state.misc)
    useErrors([{isError,error}])
    const socket = getSocket();
    
    const newMessageAlertHandler = useCallback((data) => {
      console.log(chatId , data.chatId)
      if(chatIdRef.current !== data.chatId){
        dispatch(setMessageCount({chatId:data?.chatId}));
      } 
    } , [chatId])

    useEffect(() => {
      getOrSaveFromLocalStorage({key:NEW_MESSAGE_ALERT , val:newMessageAlert})
    } , [newMessageAlert])

    const newRequestHandler = useCallback((data) => {
      dispatch(notificationCountIncrement());
    },[])

    const refetchChatHandler = () => {
      refetch();
    }

    const eventHandlers = {[NEW_MESSAGE_ALERT] : newMessageAlertHandler ,
       [NEW_REQUEST] : newRequestHandler ,
       [REFETCH_CHATS] : refetchChatHandler
       };
       
       useEffect(() => {
        Object.entries(eventHandlers).forEach(([event , handler]) => {
          socket.on(event , handler);
        })
        return () => Object.entries(eventHandlers).forEach(([event , handler]) => {
          socket.off(event , handler);
        })
       },[])

       useEffect(() => {
          chatIdRef.current = chatId
       } , [chatId])
  
    useEffect(() => {

      data && setChats(data?.message);
    }, [data]);

    const handleMobile = () => {
      dispatch(setIsMobile(false))
    }

    const handleDeleteChat = (e, chatId, groupChat) => {
      console.log("delete chat", chatId, groupChat);
    };

    return (
      <>
        <Title />
        <Box width={'100vw'} height={'100vh'} >

        <Header />
        <div style={{
          paddingTop:'4rem'
        }}>

        {isLoading ? <Skeleton/> : <Drawer open={isMobile} onClose={handleMobile}>

        <ChatLayout
        w="70vw"
        handleDeleteChat={handleDeleteChat}
        chats={chats}
        chatId={chatId}
        newMessageAlert={newMessageAlert}
        />
              </Drawer> 
              }
      

        <Grid container width={'100vw'} height={"calc(100vh - 4rem)"} margin={0}>
          <Grid
            item
            sm={4}
            md={3}
            lg={3}
            sx={{
              display: { xs: "none", sm: "block" },
              borderRight: "1px solid rgba(0, 0, 0, 0.2)",
            }}
            height={"100%"}
            >
            {isLoading ? <Skeleton/> : <ChatLayout
              handleDeleteChat={handleDeleteChat}
              chats={chats}
              chatId={chatId}
              newMessageAlert={newMessageAlert}
              />}
          </Grid>
          <Grid item xs={12} sm={8} md={5} lg={6} width={'100%'} height={'calc(100vh - 4rem)'}>
            <WrappedComponent {...props} chatId={chatId}/>
          </Grid>
          <Grid
            item
            md={4}
            lg={3}
            height={"100%"}
            sx={{
              display: { xs: "none", md: "block" },
              padding: "0",
              bgcolor: "rgba(0, 0, 0, 0.2)",
            }}
            >
            <Profile />
          </Grid>
        </Grid>
  </div>
</Box>
      </>
    );
  };
};

export default AppLayout;
