import { NavLink, Outlet } from "react-router-dom";
import { AppBar, Box , Drawer , Toolbar , Typography, IconButton,
    Divider , List, ListItemButton, ListItemIcon, ListItemText,
    useMediaQuery
} from "@mui/material";

import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { toggleSidebar, closeSidebar } from "@/app/store/uiSlice";
import MenuIcon from '@mui/icons-material/Menu'

const drawerWidth = 240;

export default function AppLayout(){
    const dispatch = useAppDispatch();

    const sidebarOpen = useAppSelector(
        (state)=> state.ui.sidebarOpen
    );

    const isMobile = useMediaQuery((theme)=>
    theme.breakpoints.down("md"),
    );

    const drawerVariant = isMobile ? "temporary" : "permanent";

    return(
       <Box sx={{ display:"flex", minHeight:"100vh"}}>
        <AppBar
        position="fixed"
        sx={{zIndex: (theme)=> theme.zIndex.drawer + 1 }}
        >
            <Toolbar>
                <IconButton
                color="inherit"
                onClick={()=> dispatch(toggleSidebar())}
                sx={{mr:2}}
                edge="start"
                >
                    <MenuIcon />
                </IconButton>

                <Typography variant="h6">
                    Project Management System
                </Typography>
            </Toolbar>
        </AppBar>

        <Drawer
        variant={drawerVariant}
        open={isMobile ? sidebarOpen: true}
        onClose={()=> dispatch(closeSidebar())}
        sx={{
            width: isMobile ? drawerWidth : sidebarOpen ? drawerWidth : 0,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing:"border-box",
                transition: (theme)=> 
                    theme.transitions.create("width", {
                        duration:theme.transitions.duration.standard,
                    }),
                    ...(isMobile
                        ? {} : {
                            width: sidebarOpen ? drawerWidth : 0,
                            overflow: " hidden",
                        }
                    )
            },
        }}
        >
            <Toolbar />

            <Box sx={{ overflow:"auto"}}>
                <List>
                    <NavLink 
                    to={`/dashboard`}
                    style={{ color:"inherit", textDecoration:"none" }} 
                    onClick={()=> {
                        if (isMobile){
                            dispatch(closeSidebar())
                        }
                    }}
                    >
                        {({isActive}) =>
                        <ListItemButton selected={isActive}>
                            <ListItemIcon>
                                <DashboardOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItemButton>
                    }
                    </NavLink>
                    <NavLink to={`/projects`}
                    style={{color:"inherit",
                        textDecoration:"none"
                    }}
                    onClick={()=>{
                        if(isMobile){
                            dispatch(closeSidebar())
                        }
                    }}
                    >
                        {({isActive})=> 
                    <ListItemButton selected={isActive} >
                        <ListItemIcon>
                            <FolderOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Projects" />
                    </ListItemButton>
                    }
                    </NavLink>  
                </List>
                <Divider />
            </Box>
        </Drawer>
        <Box 
        component={`main`}
        sx={{ flexGrow:1,
             p:{xs:2 , sm:3},
            mt:8,
            minWidth:0,
            transition: (theme)=> 
                theme.transitions.create("margin", {
                    duration: theme.transitions.duration.standard
                })
        }}
        >
            <Outlet />
        </Box>
       </Box>
    )
}