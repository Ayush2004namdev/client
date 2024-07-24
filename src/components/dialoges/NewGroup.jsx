import { Button, Dialog, DialogTitle, Stack, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateNewGroupMutation, useMyChatsQuery } from '../../redux/api/api';
import { setIsNewGroup } from '../../redux/slices/misc';
import UserItem from '../Shared/UserItem';
import {useErrors} from '../../hooks/Hook'

const NewGroup = () => {

  const [members,setMembers] = useState([]);
  const [selectedMembers,setSelectedMembers] = useState([]);
  const [groupName,setGroupName] = useState(''); 
  const [createGroup] = useCreateNewGroupMutation()
  const {isLoading , error , isError , data} = useMyChatsQuery()
  const dispatch = useDispatch();

  const {isNewGroup} =  useSelector(state => state.misc)

  const createGroupHandler =async () =>{
    if(!groupName)return toast.error('GroupName should not empty');
    console.log(groupName,selectedMembers);
    try {
      const res = await createGroup({name:groupName , members:selectedMembers})
      
      if(res?.data?.success){
        toast.success(res?.data?.message || 'Work done... ');
        console.log(res.data)
      }else{
        console.log(res);
        toast.error(res?.error?.data?.message || 'Something went Wrong')
      }
    } catch (error) {
      toast.error(error?.message || 'Something Went Wrong')
      console.log(error);
    }
   
  } ;
  useEffect(() => {
    data && setMembers(data?.message);
  } , [data])

  useErrors([{error,isError}]);

  const selectMembersHandler = (id) => {
    setMembers((member) => member.map((user) => user._id === id ? {...user,isAdded:!user.isAdded} : user));
    setSelectedMembers(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev,id])
  };

  const closeHandler = () => dispatch(setIsNewGroup(false));
  const handleGroupCancel = () => {
    setSelectedMembers([]);
    dispatch(setIsNewGroup(false))
  }
  return (
    <Dialog open={isNewGroup} onClose={closeHandler}>
    <Stack p={{xs:'1rem' , sm:'3rem'}} width={'80vw'} spacing={'1rem'}>
      <DialogTitle textAlign={'center'} variant='h4' >New Group</DialogTitle>

      <TextField
        onChange={(e) => setGroupName(e.target.value)}
        value={groupName}
      />
      <Stack>
      {members.length > 0 && members.map((user) => (
            <UserItem user={user} key={user._id} handler={selectMembersHandler}  />
          ))}
      </Stack>
      <Stack direction={'row'} justifyContent={'space-evenly'}>
        <Button variant='text' onClick={handleGroupCancel} color='error'>Cancel</Button>
        <Button variant='contained' onClick={createGroupHandler}>Create</Button>
      </Stack>
    </Stack>
  </Dialog>
  )
}

export default NewGroup