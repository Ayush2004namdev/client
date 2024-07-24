import { Avatar, Button, Dialog, DialogTitle, IconButton, ListItem, Stack, Typography } from '@mui/material'
import React, { memo, useEffect, useState } from 'react'
import { notificationSample } from '../../constants/SampleData'
import { Add as AddIcon} from '@mui/icons-material';
import { useErrors } from '../../hooks/Hook';
import { useAddFriendMutation, useGetNotificationsQuery } from '../../redux/api/api';
import { useDispatch, useSelector } from 'react-redux';
import { setIsNotification} from '../../redux/slices/misc'
import { useAsyncMutation } from '../../hooks/asyncMutation';
import toast from 'react-hot-toast';


const Notification = () => {
  const [notifications,setNotifications] = useState([]);
  const {isLoading , error , data , isError} = useGetNotificationsQuery();
  const {isNotification} = useSelector(state => state.misc)
  const dispatch = useDispatch();
  const [acceptRequest] = useAddFriendMutation();
  const notificationHandler =async ({_id,accept}) => {
     try {
        const res = await acceptRequest({reqId:_id , accept});
        toast.success(res?.data?.message|| 'Wok done...')
        dispatch(setIsNotification(false))
     } catch (error) {
        toast.error(error?.message || 'Something went wrong')
        console.log(error)
     }
     
    console.log('notification handler');
  }
  
  useEffect(() => {
      data && setNotifications(data?.request)
  } , [data])


  useErrors([{isError,error}]);

  return (
    <Dialog open={isNotification} onClose={() => dispatch(setIsNotification(false))}>
      <Stack p={{xs:'1rem' , sm:'1rem'}} maxWidth={'25rem'}>
        <DialogTitle>Notification</DialogTitle>

        {notifications.length > 0 ? notifications.map((notification,index) => (
          <NotificationItem key={notification._id} sender={notification.sender}  handler={notificationHandler} _id={notification._id} />
        )) : (
          <Typography textAlign={'center'}>0 Notifications</Typography>
        )}
      </Stack>
    </Dialog>
  )
}

const NotificationItem = memo(({sender,_id,handler}) => {
  const {name , avatar} = sender;
  return (
    <ListItem>
        <Stack direction={'row'} width={'100%'} spacing={'1rem'} alignItems={'center'}>
            <Avatar />
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
            >{`${name} sent you a Friend Request`}
            </Typography>
            
        </Stack>

        <Stack direction={{
          xs:'column',
          sm:'row'
        }}>
          <Button onClick={() => handler({_id,accept:true})}>Accept</Button>
          <Button color='error' onClick={() => handler({_id,accept:false})}>Reject</Button>
        </Stack>
    </ListItem>  
  )
})

export default Notification