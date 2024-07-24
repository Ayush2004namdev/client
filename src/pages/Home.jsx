import React from 'react'
import AppLayout from '../components/layout/AppLayout'
import { Box, Typography } from '@mui/material';

const Home = () => {
  return (
    <Box height={'100%'}>
        <Typography variant='h5' alignItems={'center'}>Select a Friend to Chat</Typography>
    </Box>
  )
}

export default AppLayout()(Home);