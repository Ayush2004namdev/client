import { Avatar, Stack, Typography } from '@mui/material'
import React from 'react'
import {
    Face,
    AlternateEmail,
    CalendarMonth,
} from '@mui/icons-material'
import { useSelector } from 'react-redux'
import moment from 'moment'

const Profile = () => {

    const {user} = useSelector(state => state.user)
  return (
    <Stack direction={'column'} spacing={'2rem'} alignItems={'center'} >
        <a href={user?.avatar?.url} target='_blank'>
        <Avatar
        src={user?.avatar?.url}
        sx={{
            width:200,
            height:200,
            border:'1px solid white',
            mb:'1rem',
            objectFit:'contain'
        }}
        />
        </a>
        <ProfileCard heading={'bio'}  text={user?.bio}/>
        <ProfileCard heading={'Username'} icon={<AlternateEmail/>} text={user?.username}/>
        <ProfileCard heading={'Name'} icon={<Face/>} text={user?.name}/>
        <ProfileCard heading={'joined'} icon={<CalendarMonth/>}  text={moment(user?.createdAt).fromNow()}/>
    </Stack>
  )
}

const ProfileCard = ({text,icon,heading}) => {
    return (
        <Stack direction={'row'} spacing={'1rem'} textAlign={'center'} alignItems={'center'}>
            {icon && icon}
            <Stack>
                <Typography textTransform={'capitalize'} variant='body1'>{text}</Typography>
                <Typography textTransform={'capitalize'} color={'gray'} variant='caption'>{heading}</Typography>
            </Stack>
        </Stack>
    )
}

export default Profile