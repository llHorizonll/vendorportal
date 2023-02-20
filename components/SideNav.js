import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import HomeIcon from "@mui/icons-material/Home";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useUser } from "@supabase/auth-helpers-react";

const drawerWidth = 240;
const menuItems = [
  {
    id: 1,
    path: "/",
    title: "Dashboard",
    icon: HomeIcon,
  },
  {
    id: 2,
    path: "/contacts",
    title: "Contacts",
    icon: InboxIcon,
  },
  {
    id: 3,
    path: "/quotations",
    title: "Quotations",
    icon: MailIcon,
  },
  {
    id: 4,
    path: "/purchase-order",
    title: "Purchase order",
    icon: InboxIcon,
  },
  {
    id: 5,
    path: "/catalogue",
    title: "Catalogue",
    icon: InboxIcon,
  },
  {
    id: 6,
    path: "/price-list",
    title: "Price lists",
    icon: InboxIcon,
  },
];

const Sidenav = (props) => {
  const { window, open, handleDrawerToggle } = props;
  const theme = useTheme();
  const DesktopView = useMediaQuery(theme.breakpoints.up("sm"));
  const router = useRouter();

  const activeRoute = (routeName, currentRoute) => {
    return routeName === currentRoute ? true : false;
  };

  const drawerMobile = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Divider />
      <List>
        {menuItems.map((item, index) => (
          <Link href={item.path} style={{ textDecoration: "none", color: "black" }} key={index}>
            <ListItem key={item} disablePadding>
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
  const user = useUser();
  if (!user || router.pathname === "/redirectPage") {
    return null;
  }

  return (
    <Box component="nav">
      {DesktopView ? (
        <Drawer
          variant="permanent"
          sx={{
            display: open ? "none" : "block",
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: "auto" }}>
            <List>
              {menuItems.map((item, index) => (
                <Link href={item.path} style={{ textDecoration: "none", color: "black" }} key={index}>
                  <ListItemButton key={index} selected={activeRoute(item.path, router.pathname)}>
                    <ListItemIcon>
                      <item.icon />
                    </ListItemIcon>
                    <ListItemText primary={item.title} />
                  </ListItemButton>
                </Link>
              ))}
            </List>
          </Box>
        </Drawer>
      ) : (
        <Drawer
          container={container}
          variant="temporary"
          open={open}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
        >
          <Toolbar />
          {drawerMobile}
        </Drawer>
      )}
    </Box>
  );
};

export default Sidenav;
