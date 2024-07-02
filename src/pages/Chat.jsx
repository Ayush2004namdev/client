import { Avatar, IconButton, Input, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { sampleData } from '../constants/SampleData';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import { AttachFile, FileCopyRounded, Pin, Send } from '@mui/icons-material';
import { ChatInput } from '../components/styles/VisuallyHiddenComponent';

const Chat = () => {
  return (
    <>
      <Stack height={"90%"}  width={'100%'} padding={'2rem'}>
        
      </Stack>
      <Stack height={"10%"}  alignItems={'center'} direction={'row'} spacing={'1rem'} width={'100%'} padding={'0.2rem'}>
        <Tooltip title={'Attach File'}>
          <IconButton>
            <AttachFile/>
          </IconButton>
        </Tooltip>
        <ChatInput placeholder={'Type a message'} />
        <Tooltip title={'send'}>
          <IconButton sx={{
              borderRadius: '50%',
              p: '0.5rem',

              rotate: '-35deg',
            }}>
            <Send />
          </IconButton>
        </Tooltip>
      </Stack>
    </>
  )};

export default AppLayout()(Chat);