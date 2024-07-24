import { Add as AddIcon, Remove } from '@mui/icons-material';
import { Avatar, IconButton, ListItem, Stack, Typography } from '@mui/material';
import React, { memo } from 'react'
import {transformImage} from '../../lib/features'

const UserItem = ({user,handler,handlerIsLoading}) => {
    
    const {name,_id,avatar,isAdded} = user;
    console.log(user);
  return (
    <ListItem>
        <Stack direction={'row'} width={'100%'} spacing={'1rem'} alignItems={'center'}>
            <Avatar src={transformImage(avatar?.url)}/>
            <Typography variant='body1'
            sx={{
                width:'100%',
                flexGrow:1,
                display:'-webkit-box',
                WebkitLineClamp:1,
                WebkitBoxOrient:'vertical',
                overflow:'hidden',
                textOverflow:'ellipsis'
            }}
            >{name}</Typography>
            <IconButton size='small' sx={{
                bgcolor:isAdded ? 'error.main' : 'primary.main',
                color:'white',
                '&:hover':{
                    bgcolor: isAdded? 'error.dark' : 'primary.dark'
                }
            }} onClick={() => handler(_id)} disabled={handlerIsLoading}>
                {isAdded ? <Remove/> : <AddIcon/>}
                
            </IconButton>
        </Stack>
    </ListItem>
  )
}

export default memo(UserItem);