import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Box from "@mui/material/Box";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Fade from "@mui/material/Fade";
import Link from "next/link";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { Avatar } from "@mui/material";

const Navbar = (props) => {
  const router = useRouter();

  const { handleDrawerToggle } = props;
  const [anchorEl, setAnchorEl] = React.useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const supabaseClient = useSupabaseClient();
  const user = useUser();
  if (!user) {
    return null;
  }

  const ScrollTop = (props) => {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
      target: window ? window() : undefined,
      disableHysteresis: true,
      threshold: 100,
    });

    const handleClick = (event) => {
      const anchor = event.target.ownerDocument.querySelector("#back-to-top-anchor");

      if (anchor) {
        anchor.scrollIntoView({
          block: "center",
        });
      }
    };

    return (
      <Fade in={trigger}>
        <Box onClick={handleClick} role="presentation" sx={{ position: "fixed", bottom: 16, right: 16 }}>
          {children}
        </Box>
      </Fade>
    );
  };

  const routename = router.pathname.slice(1).charAt(0).toUpperCase() + router.pathname.slice(1).slice(1);

  return (
    <AppBar position="fixed" color="secondary" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Link href="/">
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
        </Link>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {routename}
        </Typography>
        <>
          <Button
            sx={{ padding: 0 }}
            color="inherit"
            variant="text"
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            endIcon={
              user?.user_metadata?.avatar_url ? (
                <Avatar src={user?.user_metadata?.avatar_url} />
              ) : (
                <Avatar>{user?.email[0].toUpperCase()}</Avatar>
              )
            }

            // <AccountCircle sx={{ width: 44, height: 44, marginLeft: 1 }}  />}
          >
            {user.email}
          </Button>

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                supabaseClient.auth.signOut();
                router.push("/");
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </>
      </Toolbar>
      <ScrollTop {...props}>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </AppBar>
  );
};

export default Navbar;
