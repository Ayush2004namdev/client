import React from "react";
import { sampleData } from "../../constants/SampleData";
import { Avatar, Stack, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const ChatLayout = () => {
  return (
    <>
      <Stack height={"100%"}>
        {sampleData.map((data) => {
          return <Chat {...data} key={data.id} />;
        })}
      </Stack>
    </>
  );
};

const Chat = ({ avatar, name, _id }) => {
    const {id} = useParams();
    const navigate = useNavigate();

  return (
    <>
      <Stack
        direction={"row"}
        spacing={"0.2rem"}
        onClick={() => navigate(`/chat/${_id}`)}
        alignItems={"center"}
        padding={"1rem"}
        sx={
          (id == _id) ? {
            cursor: 'pointer',
            bgcolor: "rgba(0,0,0,0.5)",
            color: "white"
        } : {
            cursor: 'pointer',
            bgcolor: "rgba(0,0,0,0)",
            color: "black"
        }
          }
      > 
        <Avatar />
        <Typography variant="subtitle1">{name}</Typography>
      </Stack>
    </>
  );
};

export default ChatLayout;
