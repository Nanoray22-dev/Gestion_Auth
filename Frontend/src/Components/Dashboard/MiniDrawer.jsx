import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import MailIcon from "@mui/icons-material/Mail";
import {  Outlet } from "react-router";
import { NavLink, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import StarIcon from "@mui/icons-material/Star";
// import EmailIcon from '@mui/icons-material/Email';
import DraftsIcon from "@mui/icons-material/Drafts";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import LayersIcon from "@mui/icons-material/Layers";
import PagesIcon from "@mui/icons-material/Pages";
import SettingsIcon from "@mui/icons-material/Settings";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ContrastIcon from '@mui/icons-material/Contrast';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import HelpIcon from '@mui/icons-material/Help';
import ContactMailIcon from '@mui/icons-material/ContactMail'
import { useUser } from "../UserContex";

const drawerWidth = 240;

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

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

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

const iconMap = {
  Home: (
    <NavLink to={"/home"}>
      <HomeIcon />
    </NavLink>
  ),
  Roles: (
    <NavLink to={"/rol"}>
      <StarIcon />
    </NavLink>
  ),
  Usuarios: (
    <NavLink to={"/usuarios"}>
      <ContactMailIcon />
    </NavLink>
  ),
  Bitacoras: (
    <NavLink to={"/bitacora"}>
      <DraftsIcon />
    </NavLink>
  ),
  Enlaces: (
    <NavLink to={"/enlace"}>
      <LayersIcon />
    </NavLink>
  ),
  Pages: (
    <NavLink to={"/pages"}>
      <PagesIcon />
    </NavLink>
  ),
};

export default function MiniDrawer() {

const navigate = useNavigate();
const {user} = useUser();
// if (!user || !user.authenticated || !user.authorized) {
//   // Si el usuario no está autenticado o autorizado, redirige a la página de inicio de sesión
//   return <Navigate to="/login" />;
// }

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate('/login');
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* Navbar */}
      <AppBar position="fixed" open={open}>
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

          {user && <h1>Bienvenido, {user.name}!</h1>}


          {/* Agrega el botón de logout */}
          <IconButton
            color="inherit"
            aria-label="logout"
            onClick={handleLogout} // Define una función handleLogout para manejar el logout
            sx={{ marginLeft: "auto" }} // Estilo para alinear el botón a la derecha del navbar
          >

             <ExitToAppIcon />

            {/* Importa y utiliza el icono ExitToAppIcon */}
          </IconButton>
        </Toolbar>
      </AppBar>
      {/* Navbar */}

      {/* Sidebar */}
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <h1 className="text-center font-bold text-3xl">Bookmarks</h1>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["Home", "Roles", "Usuarios", "Bitacoras", "Enlaces", "Pages"].map(
            (text) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{iconMap[text]}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            )
          )}
          <Divider />
          {/* Accordion */}
          {open && (
            <Accordion sx={{ width: "100%" }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel-content"
                id="panel-header"
                sx={{
                  mr: 2
                }}
              >
                <ListItemButton className="">
                  <ListItemIcon className="">
                    <SettingsIcon  className=""/>
                  </ListItemIcon>
                  <ListItemText primary="Configuraciones"  className=""/>
                </ListItemButton>
              </AccordionSummary>
              <AccordionDetails sx={{ pl: 0 }}>
                <List>
                  <ListItem  onClick={handleLogout}>
                    <ListItemIcon>
                      <ManageAccountsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Configurar Perfil" />
                  </ListItem>
                  <ListItem  onClick={handleLogout}>
                    <ListItemIcon>
                      <ContrastIcon />
                    </ListItemIcon>
                    <ListItemText primary="Ligth - Dark" />
                  </ListItem>
                  <ListItem  onClick={handleLogout}>
                    <ListItemIcon>
                      <HelpIcon />
                    </ListItemIcon>
                    <ListItemText primary="Ayuda" />
                  </ListItem>
                  {/* Agrega más opciones aquí si es necesario */}
                </List>
              </AccordionDetails>
            </Accordion>
          )}
          {/* Fin del Accordion */}
        </List>
      </Drawer>
      {/* Sidebar */}

      {/* Main content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
        {/* Contenido del dashboard */}
      </Box>
      {/* Main content */}
    </Box>
  );
}
