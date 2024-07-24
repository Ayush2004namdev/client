import { Box, Stack, Typography } from "@mui/material";
import React,{memo} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link  } from "../styles/VisuallyHiddenComponent";
import AvatarCard from "./AvatarCard";
import { useDispatch } from "react-redux";
import { removeMessageAlertCount } from "../../redux/slices/chat";

const ChatItem = ({
    avatar=[],
    name,
    _id,
    groupChat = false,
    sameSender,
    isOnline,
    newMessage,
    index=0,
    handleDeleteChat
  }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLinkClick = () => {
      if(!sameSender){
        newMessage && dispatch(removeMessageAlertCount({chatId:_id}))
        navigate(`/chat/${_id}`);
      }
      
    }

    return  <div style={{
      cursor:'pointer'
    }}  onClick={handleLinkClick} onContextMenu={(e) => handleDeleteChat(e,_id,groupChat)}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          padding: '1rem',
          gap: '1rem',
          position: 'relative',
          color: sameSender ? 'white' : 'black',
          backgroundColor: sameSender ? 'black' : 'unset',
        }}> 
        <AvatarCard avatar={avatar} />
        <Stack>
          <Typography>{name}</Typography>
          {newMessage && <Typography>{newMessage.count} New Message</Typography>}
        </Stack>
        {isOnline && <Box sx={{
          width: '0.5rem',
          height: '0.5rem',
          borderRadius: '50%',
          backgroundColor: 'green',
          position: 'absolute',
          top: '50%',
          right: '1rem',
          transform: 'translateY(-50%)'
        }}/>}

        </div>
     </div>
  };

export default memo(ChatItem)