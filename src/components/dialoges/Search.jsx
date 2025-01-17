import { Search as SearchIcon } from '@mui/icons-material';
import { Dialog, DialogTitle, InputAdornment, List, Stack, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAsyncMutation } from '../../hooks/asyncMutation';
import { useLazySearchUsersQuery, useSendFriendRequestMutation } from '../../redux/api/api';
import { setIsSearch } from '../../redux/slices/misc';
import UserItem from '../Shared/UserItem';


const Search = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);

  const [sendRequest,isLoadingFriendRequest] = useAsyncMutation(useSendFriendRequestMutation);
  const addFriendHandler = async(id) => {
    await sendRequest('Sending friend request...',{userId:id})
  }

  const {isSearch} = useSelector(state => state.misc)
  const handleOnSearchClose = () => {
    dispatch(setIsSearch(false))
  }

  const [searchUser]  = useLazySearchUsersQuery(); 
  

  useEffect(() => {
    const searchTimeOut = setTimeout(() => {
      searchUser(search).then(({data}) => setUsers(data?.data)).catch((err) => console.log(err)) 
      },1000)

    return () => clearInterval(searchTimeOut);
  },[search])


  return (
    <Dialog open={isSearch} onClose={handleOnSearchClose}>
      <Stack direction={'column'} sx={{
        padding:{
          xs:'0.5rem',
          sm:'1rem'
        }
      }} width={'70vw'}>
        <DialogTitle textAlign={'center'}>Search</DialogTitle>
        <TextField
         label={""}
         value={search}
         onChange={(e) => setSearch(e.target.value)}
         size='small'
         variant={'outlined'} 
         InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        />

        <List>
          {users && users.map((user) => (
            <UserItem user={user} key={user._id} handler={addFriendHandler} handlerIsLoading={isLoadingFriendRequest} />
          ))}
        </List>
      </Stack>
    </Dialog> 
  )
}

export default Search