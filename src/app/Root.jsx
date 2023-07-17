import { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Outlet } from "react-router-dom";
import { Avatar, Badge, Stack } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Sidebar, {
  drawerWidth,
  DrawerHeader,
} from "../components/Layout/Sidebar";
// alert
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Root = () => {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <CssBaseline />
      <AppBar position="fixed" open={open} color="primary">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box width="100%">
            <Stack
              width="100%"
              flexDirection="row"
              alignItems="center"
              gap="16px"
              justifyContent="end"
            >
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
              <Stack flexDirection="row" alignItems="center" gap="12px">
                <Avatar
                  alt="Yasser"
                  src="https://cdn-icons-png.flaticon.com/512/147/147144.png"
                  sx={{ width: 36, height: 36 }}
                />
                <Box>
                  <Typography sx={{ fontSize: "16px" }}>Yasser</Typography>
                  <Typography sx={{ fontSize: "12px" }}>
                    admin@dash.com
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </Box>
        </Toolbar>
      </AppBar>
      <Sidebar open={open} handleDrawerClose={handleDrawerClose} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {/* Render Pages here */}
        <Box sx={{ ml: "64px" }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Root;
