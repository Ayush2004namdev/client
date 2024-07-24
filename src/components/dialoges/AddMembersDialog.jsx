import { Button, Dialog, DialogTitle, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { userSample } from '../../constants/SampleData'
import UserItem from '../Shared/UserItem'
import { useDispatch, useSelector } from 'react-redux'
import { setIsAddMember } from '../../redux/slices/misc'

const AddMembersDialog = ({addMember , isLoadingAddMember , chatId}) => {

    const [members,setMembers] = useState(userSample);
    const [selectedMembers,setSelectedMembers] = useState([]);
    const dispatch = useDispatch();
    const {isAddMember} = useSelector(state => state.misc);
    const selectMembersHandler = (id) => {
        setMembers((member) => member.map((user) => user._id === id ? {...user,isAdded:!user.isAdded} : user));
        setSelectedMembers(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev,id])
      };
    
    const AddMemberSubmitHandler = () => {
        console.log('Add Member');
    }

    const closeHandler = () => {
        dispatch(setIsAddMember(false));
    }

  return (  
    <Dialog open={isAddMember} onClose={closeHandler}>
        <Stack minWidth={'30vw'} spacing={'2rem'} p={'1rem'}>
            <DialogTitle textAlign={'center'}>Add Members</DialogTitle>
            <Stack >
                {
                    members?.length > 0 ? members.map((user) => {
                        return <UserItem user={user} key={user._id} handler={selectMembersHandler}
                         
                         />
                    }) : <Typography textAlign={'center'} >No Friends🙂</Typography>
                }
            </Stack>
            <Stack direction={'row'} justifyContent={'space-around'} alignItems={'center'}>
                <Button color='error' onClick={closeHandler}>cancel</Button>
                <Button variant='contained' onClick={AddMemberSubmitHandler} disabled={isLoadingAddMember}>Add</Button>
            </Stack>
        </Stack>
    </Dialog>
  )
}

export default AddMembersDialog