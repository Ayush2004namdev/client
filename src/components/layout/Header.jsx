import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { orange } from "../../constants/Color";
import { Add, Group, Logout, Menu, Notifications, Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Header = () => {

  const navigate = useNavigate();

  const handleMoblieView = () => {
    console.log("mobile view");
  };
  const handleSearch = () => {
    console.log("search");
  };
  const openNewGroup = () => {
    console.log("new group");
  };

  const handleToGroup = () => {
    navigate("/groups");
  }

  const handleLogout = () => {
    console.log("logout");
  }

  const handleNotifications = () => {
    console.log("notifications");
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={"4rem"}>
        <AppBar
          position="static"
          sx={{
            bgcolor: orange,
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              sx={{
                display: { xs: "none", sm: "block" },
              }}
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
                display: { xs: "none", sm: "block" },
              }}
            >
              <IconComp title="Search" icon={<Search />} onclick={handleSearch} />
              <IconComp title={"New Group"} icon={<Add />} onclick={openNewGroup} />
              <IconComp title="Manage Group" icon={<Group />} onclick={handleToGroup} />
              <IconComp title="Notifications" icon={<Notifications />} onclick={handleNotifications} />
              <IconComp title="Logout" icon={<Logout />} onclick={handleLogout} />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

const IconComp = ({title,icon,onclick}) => {
  return (
    <Tooltip title={title}>
      <IconButton color="inherit" onClick={onclick}>
        {icon}
      </IconButton>
    </Tooltip>
  );
};

export default Header;
