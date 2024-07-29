import {
  Add as AddIcon,
  Delete,
  Done,
  Edit,
  KeyboardBackspace,
  Menu
} from "@mui/icons-material";
import {
  Backdrop,
  Box,
  Button,
  Drawer,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { lazy, memo, Suspense, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LayoutLoader } from "../components/layout/Loaders";
import AvatarCard from "../components/Shared/AvatarCard";
import UserItem from "../components/Shared/UserItem";
import { Link } from "../components/styles/VisuallyHiddenComponent";
import { matblack } from "../constants/Color";
import { useAsyncMutation } from "../hooks/asyncMutation";
import {  useErrors } from '../hooks/Hook';
import { useChatDetailsQuery, useGetMyGroupsQuery, useRemoveFromGroupMutation, useRenameGroupMutation } from "../redux/api/api";
import { setIsAddMember, setIsMobile } from "../redux/slices/misc";


const ConfirmDeleteDialog = lazy(() => import('../components/dialoges/ConfirmDeleteDialog'));
const AddMembersDialog = lazy(() => import('../components/dialoges/AddMembersDialog'));

const Groups = () => {
  
  const navigate = useNavigate();
  const [member, setMember] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [groupName,setGroupName] = useState("");
  const [groupNameUpdated , setGroupNameUpdated] = useState("");
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
  const [groups , setGroups] = useState([]);
  const chatId = useSearchParams()[0].get("groupId"); 
  const {isMobile , isAddMember} = useSelector(state => state.misc);
  const dispatch = useDispatch();
  const MyGroups = useGetMyGroupsQuery('');
  const GroupDetails = useChatDetailsQuery({chatId , populate : true} , {skip : !chatId});
  const [renameGroup] = useRenameGroupMutation();
  const [removeFromGroup , isLoading, responseOfRemoveFromGroup] = useAsyncMutation(useRemoveFromGroupMutation)
  
  useEffect(() => {
    MyGroups.data && setGroups(MyGroups.data.message);
  } , [MyGroups.data ])

  useErrors([{
    isError: MyGroups.isError,
    error: MyGroups.error 
  }])

  const navigateBack = () => {
    navigate("/");
  };

  const openConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(true);
  };

  const confirmAddHandler = () => {
    dispatch(setIsAddMember(true));
  };

  const closeConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(false);
  };
  
  useEffect(() => {
   if(GroupDetails.data){
     setGroupName(GroupDetails.data.chats.name);
     setGroupNameUpdated(GroupDetails.data.chats.name);
     setMember(GroupDetails.data.chats.members.map(user => ({...user,isAdded:true})));
    } 
    return () => {
      setGroupName("");
      setGroupNameUpdated("");
      setIsEdit(false);
      setMember([]);
    }
  },[chatId,GroupDetails.data])

  const updateGroupName = async () => {
    console.log(groupNameUpdated);
    try{
      const {data} = await renameGroup({chatId,name:groupNameUpdated});
      toast.success(data?.message || 'Group Name Updated Successfully');
    }catch(error){
      toast.error(error?.message || 'Something went Wrong')
    }finally{
      setIsEdit(false)
    }
  }

  const removeMemberHandler = async(id) => {
    const res = await removeFromGroup('Removed Successfully' , {groupId:chatId,userId:id});
    console.log( {responseOfRemoveFromGroup , res});
    console.log(id , chatId);
  };

  const deleteHandler = () => {};

  console.log('hii')

  const handleMobileMenuClose = () => dispatch(setIsMobile(false));
  const handleMobileOpen = () => dispatch(setIsMobile(true));
  const IconBtns = (
    <>
      <Box
        sx={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
          display: {
            xs: "block",
            sm: "none",
          },
        }}
      >
        <IconButton onClick={handleMobileOpen}>
          <Menu />
        </IconButton>
      </Box>

      <Tooltip title="Back">
        <IconButton
          sx={{
            position: "absolute",
            top: "1rem",
            left: "2rem",
            bgcolor: matblack,
            color: "white",
            ":hover": {
              color: "black",
            },
          }}
          onClick={navigateBack}
        >
          <KeyboardBackspace />
        </IconButton>
      </Tooltip>
    </>
  );

  const GroupName = (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      alignItems={"center"}
      justifyContent={"center"}
      pb={"0.5rem"}
      pt={"2rem"}
    >
      {isEdit ? (
        <>
          <TextField value={groupNameUpdated} onChange={(e) => setGroupNameUpdated(e.target.value)} />
          <IconButton onClick={updateGroupName}>
            <Done />
          </IconButton>
        </>
      ) : (
        <>
          <Typography variant={"h4"}>{groupName}</Typography>
          <IconButton onClick={() => setIsEdit(!isEdit)}>
            <Edit />
          </IconButton>
        </>
      )}
    </Stack>
  );


  const buttonGroup = (<>
    <Stack
      direction={{
        sm: "column-reverse",
        md: "row"
      }}
      p={{
        xs: '0',
        sm: '1rem',
        md: '1rem 4rem'
      }}
      mt={'1rem'}
      gap={`1rem`}
      spacing={"1rem"}
    >
      <Button size="large" variant="outlined" color="error" startIcon={<Delete/>} onClick={openConfirmDeleteHandler}>Delete Group</Button>
      <Button size="large" variant="contained"  startIcon={<AddIcon/>} onClick={confirmAddHandler}>Add Member</Button>
    </Stack>
  </>)


  return MyGroups.isLoading ? <LayoutLoader/> : (
    <Grid container height={"100vh"}>
      <Grid
        item
        sm={4}
        sx={{
          display: {
            xs: "none",
            sm: "block",
          },
          bgcolor: "bisque",
        }}
      >
        <GroupList myGroups={groups} chatId={chatId} />
      </Grid>
      <Grid
      height={'100vh'}
        item
        sm={8}
        xs={12}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          padding: "1rem 3rem",
        }}
      >
        {IconBtns}

        {groupName && <>
            {GroupName}

            <Typography
            margin={'1rem'}
            alignSelf={'flex-start'}
            variant="h5" 
            >Members</Typography>

            <Stack
              maxWidth={'45rem'}
              width={'100%'}
              boxSizing={'border-box'}
              padding={{
                sm: '1rem',
                xs: '0',
                md: '1rem 4rem'
              }}
              spacing={'2rem'}
              bgcolor={'#f5f5f5'}
              height={'50vh'}
              overflow={'auto'}
            >
             {member?.length > 0  && member.map(user => (
              <UserItem key={user._id} user={user}  handler={removeMemberHandler} handlerIsLoading={false}/>
             ))} 
            </Stack>

            {buttonGroup}

        </>}



      </Grid>

              {confirmDeleteDialog && (
                <Suspense fallback={<Backdrop open/>}>
                  <ConfirmDeleteDialog open={confirmDeleteDialog} onClose={closeConfirmDeleteHandler} deleteHandler={deleteHandler}/>
                </Suspense>
              )}

              {isAddMember && ( 
                <Suspense fallback={<Backdrop open/>}>
                  <AddMembersDialog open={AddMembersDialog} onClose={closeConfirmDeleteHandler} deleteHandler={deleteHandler}/>
                </Suspense>  
              )}

      <Drawer
        sx={{
          width: "70vw",
          display: {
            xs: "block",
            sm: "none",
          },
        }}
        open={isMobile}
        onClose={handleMobileMenuClose}
      >
        <GroupList w={"60vw"} myGroups={groups} chatId={chatId} />
      </Drawer>
    </Grid>
  );
};

const GroupList = ({ w = "100%", myGroups = [], chatId }) => {
  return (
    <Stack width={w}  spacing={'0.8rem'} >
      {myGroups.length > 0 ? (
        myGroups.map((group) => (
          <GroupListItem key={group?._id} group={group} chatId={chatId} />
        ))
      ) : (
        <Typography alignItems={"center"} padding={"1rem"}>
          No Groups
        </Typography>
      )}
    </Stack>
  );
};

const GroupListItem = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group;
  return (
    <Link
      to={`?groupId=${_id}`}
      onClick={(e) => {
        if (chatId === _id) {
          e.preventDefault();
        }
      }}
    >
      <Stack direction={"row"} spacing={"1rem"}  alignItems={"center"}>
        <AvatarCard avatar={avatar} />
        <Typography>{name}</Typography>
      </Stack>
    </Link>
  );
});

export default Groups;
