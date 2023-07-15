import { Fragment, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import { NavLink } from "react-router-dom";
import { links } from "./links";
import { Collapse } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

export const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Sidebar = ({ open, handleDrawerClose }) => {
  const theme = useTheme();
  // handel sidebar links
  const [showLinks, setShowLinks] = useState(null);

  const handleShowLinks = (key) => {
    if (key == showLinks) {
      setShowLinks("");
    } else {
      setShowLinks(key);
    }
  };

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader
        sx={{
          justifyContent: "space-between",
        }}
      >
        <Typography
          component="h1"
          sx={{
            fontWeight: 500,
            fontSize: "24px",
          }}
        >
          Dash Admin
        </Typography>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List
        sx={{ width: "100%", maxWidth: 360 }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {links.map(({ label, children, key, icon, link }) => {
          return !children ? (
            <NavLink
              to={link}
              key={key}
              className={({ isActive }) => (isActive ? "active-link" : "")}
              end
            >
              <ListItemButton>
                <ListItemIcon sx={{ color: "#131921" }}>
                  {icon ? icon : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={label} />
              </ListItemButton>
            </NavLink>
          ) : (
            <Fragment key={key}>
              <ListItemButton onClick={() => handleShowLinks(key)}>
                <ListItemIcon sx={{ color: "#131921" }}>{icon}</ListItemIcon>
                <ListItemText primary={label} />
                {showLinks == key ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={showLinks == key} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {children.map((chiled) => {
                    return (
                      <NavLink to={chiled?.link} key={chiled.key} end>
                        <ListItemButton sx={{ pl: 4 }}>
                          <ListItemIcon sx={{ color: "#131921" }}>
                            {chiled?.icon ? chiled.icon : <MailIcon />}
                          </ListItemIcon>
                          <ListItemText primary={chiled.label} />
                        </ListItemButton>
                      </NavLink>
                    );
                  })}
                </List>
              </Collapse>
            </Fragment>
          );
        })}
      </List>
      <Divider />
    </Drawer>
  );
};

export default Sidebar;
