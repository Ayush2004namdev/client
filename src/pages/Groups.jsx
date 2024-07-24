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
import { useNavigate, useSearchParams } from "react-router-dom";
import AvatarCard from "../components/Shared/AvatarCard";
import { Link } from "../components/styles/VisuallyHiddenComponent";
import { matblack } from "../constants/Color";
import { userSample } from "../constants/SampleData";
import { useDispatch, useSelector } from "react-redux";
import { setIsAddMember, setIsMobile } from "../redux/slices/misc";
import UserItem from "../components/Shared/UserItem";
import { useGetMyGroupsQuery } from "../redux/api/api";
import { useErrors } from "../hooks/Hook";
import { LayoutLoader } from "../components/layout/Loaders";

const ConfirmDeleteDialog = lazy(() => import('../components/dialoges/ConfirmDeleteDialog'));
const AddMembersDialog = lazy(() => import('../components/dialoges/AddMembersDialog'));

const Groups = () => {
  
  const navigate = useNavigate();
  const [member, setMember] = useState(userSample);
  const [isEdit, setIsEdit] = useState(false);
  const [groupName,setGroupName] = useState("'");
  const [groupNameUpdated , setGroupNameUpdated] = useState("");
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
  const {isMobile , isAddMember} = useSelector(state => state.misc);
  const dispatch = useDispatch();
  const MyGroups = useGetMyGroupsQuery('');
  console.log(MyGroups.data)
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
  
  const chatId = useSearchParams()[0].get("groupId");
  useEffect(() => {
   if(chatId){
     setGroupName("Group Name");
     setGroupNameUpdated("Group Name");
     setMember(prev => prev.map(user => ({...user,isAdded:true})))
    } 
    return () => {
      setGroupName("");
      setGroupNameUpdated("");
      setIsEdit(false);
    }
  },[chatId])

  const updateGroupName = () => {
     setIsEdit(false)
  }

  const removeMemberHandler = (id) => {
    console.log(id);
  };

  const deleteHandler = () => {};

  console.log(chatId);
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
      direction={"row"}
      alignItems={"center"}
      justifyContent={"center"}
      spacing={"1rem"}
      padding={"3rem"}
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
        xs: "row",
        sm: "column-reverse"
      }}
      p={{
        xs: '0',
        sm: '1rem',
        md: '1rem 4rem'
      }}
      spacing={"1rem"}
    >
      <Button size="large" variant="outlined" color="error" startIcon={<Delete/>} onClick={openConfirmDeleteHandler}>DeleteGroup</Button>
      <Button size="large" variant="contained"  startIcon={<AddIcon/>} onClick={confirmAddHandler}>AddMember</Button>
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
        <GroupList myGroups={userSample} chatId={chatId} />
      </Grid>
      <Grid
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
            margin={'2rem'}
            alignSelf={'flex-start'}
            variant="body1" 
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
        <GroupList w={"60vw"} myGroups={userSample} chatId={chatId} />
      </Drawer>
    </Grid>
  );
};

const GroupList = ({ w = "100%", myGroups = [], chatId }) => {
  return (
    <Stack width={w} spacing={'0.8rem'} >
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
