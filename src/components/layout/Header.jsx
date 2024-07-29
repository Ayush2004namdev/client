import {
  AppBar,
  Backdrop,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { lazy, Suspense, useState } from "react";
import { orange } from "../../constants/Color";
import { Add, Group, Logout, Menu, Notifications, Search as SearchIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userNotExist } from "../../redux/slices/userSlice";
import axiosInstance from "../../lib/axios";
import { setIsMobile, setIsNewGroup, setIsNotification, setIsSearch } from "../../redux/slices/misc";
import { resetNotificationCount } from "../../redux/slices/chat";

const Search = lazy(() => import("../dialoges/Search"));
const NewGroup = lazy(() => import("../dialoges/NewGroup"));
const Notification = lazy(() => import("../dialoges/Notification"));

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const {isSearch ,  isNotification,isNewGroup} = useSelector(state => state.misc);
  const {notificationCount} = useSelector(state => state.chat);
  

  const handleMoblieView = () => {
    console.log("mobile view");
    dispatch(setIsMobile(true));
  };
  const handleSearch = () => dispatch(setIsSearch(!isSearch));
  const openNewGroup = () => {
    console.log("new group");
    dispatch(setIsNewGroup(true))
  };

  const handleToGroup = () => {
    navigate("/groups");
  }

  const handleLogout =async () => {
      await axiosInstance.get('/api/v1/user/logout')
      dispatch(userNotExist());
  }

  const handleNotifications = () => {
    console.log("notifications");
    dispatch(setIsNotification(true));
    dispatch(resetNotificationCount())
  }

  return (
    <div style={{
      position: 'fixed',
      width: '100%',
      zIndex: 1000
    }}>

      <Box sx={{ flexGrow: 1 }} height={"4rem"}>
        <AppBar
          position="static"
          sx={{
            height:'100%',
            bgcolor: orange,
          }}
          >
          <Toolbar>
            <Typography
              variant="h6"
              sx={{
                display: { xs: "none", sm: "block" ,cursor: 'pointer'},
              }}
              onClick={() => navigate("/")}
              >
              Chat app
            </Typography>
            <Box
              sx={{
                display: { xs: "block", sm: "none" },
              }}
              >
              <IconComp title="Menu" icon={<Menu />} onclick={handleMoblieView} />
            </Box>
            <Box
              sx={{
                flexGrow: 1,
              }}
              />
            <Box
              sx={{
                display: { xs: "block", sm: "block" },
              }}
              >
              <IconComp title="Search" icon={<SearchIcon />} onclick={handleSearch} />
              <IconComp title={"New Group"} icon={<Add />} onclick={openNewGroup} />
              <IconComp title="Manage Group" icon={<Group />} onclick={handleToGroup} />
              <IconComp title="Notifications" icon={<Notifications />} onclick={handleNotifications} value={notificationCount}/>
              <IconComp title="Logout" icon={<Logout />} onclick={handleLogout} />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      {isSearch && <Suspense fallback={<Backdrop open/>}>
          <Search />
      </Suspense>}
      {isNewGroup && <Suspense fallback={<Backdrop open/>}>
          <NewGroup />
      </Suspense>}
      {isNotification && <Suspense fallback={<Backdrop open/>}> 
          <Notification />
      </Suspense>}
      </div>
  );
};

const IconComp = ({title,icon,onclick , value}) => {
  return (
    <Tooltip title={title}>
      <IconButton color="inherit" onClick={onclick}>
        {value ? <Badge badgeContent={value} color="error">{icon}</Badge> : icon}
      </IconButton>
    </Tooltip>
  );
};

export default Header;
