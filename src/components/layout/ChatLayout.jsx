import { Stack } from "@mui/material";
import React from "react";
import ChatItem from "../Shared/ChatItem";

const ChatLayout = ({
  w = "100%",
  chats = [],
  chatId,
  onlineUsers = [],
  newMessageAlert = [
    {
      chatId: "",
      count: 0,
    },
  ],
  handleDeleteChat,
}) => {

  return (
    <>
      <Stack width={w} height={'100vh'} overflow={'auto'} direction={'column'}>
      {chats?.map((data , index) => {
        const {avatar,name,_id,groupChat,members} = data;
        const newMessage = newMessageAlert.find(({chatId}) => chatId === _id);
        const isOnline = members?.some((member) => onlineUsers.includes(member));
        return <ChatItem newMessage={newMessage}
        avatar={avatar}
        name={name}
        _id={_id}
        groupChat={groupChat}
        isOnline={isOnline}
        key={_id}
        sameSender={chatId === _id}
        index={index}
        handleDeleteChat={handleDeleteChat}
        />
        })}
      </Stack>
    </>
  );
};



export default ChatLayout;
