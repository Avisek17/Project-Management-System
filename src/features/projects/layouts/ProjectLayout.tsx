import { Box, Divider, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { Outlet, NavLink, useParams } from "react-router-dom";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import ViewKanbanOutlinedIcon from "@mui/icons-material/ViewKanbanOutlined";
import TaskOutlinedIcon from "@mui/icons-material/TaskOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import { TaskProvider } from "@/features/tasks/context/TaskContext";

export default function ProjectLayout(){
    const { projectId } = useParams();
    return(
        <Box>
                <Typography>Project Navigation</Typography>
                <Divider sx={{ mb:2 }}/>
                <List>
                    <NavLink 
                    to={`/projects/${projectId}`}
                    end 
                    style={{color:"inherit", textDecoration:"none"}}
                    >
                        {({isActive}) =>
                        <ListItemButton selected={isActive}>
                            <ListItemIcon>
                                <DashboardOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Overview" />
                        </ListItemButton>
                        }
                    </NavLink>

                    <NavLink 
                    to={`board`}>
                        {({isActive})=>
                        <ListItemButton selected={isActive} >
                            <ListItemIcon>
                                <ViewKanbanOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Board" />
                        </ListItemButton>
                        }
                    </NavLink>

                    <NavLink 
                    to={`tasks`}>
                        {({isActive})=>
                        <ListItemButton selected={isActive}>
                            <ListItemIcon>
                                <TaskOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Tasks" />
                        </ListItemButton>}
                        
                    </NavLink>
                    
                    <NavLink 
                    to={`members`}>
                        {({isActive})=>
                        <ListItemButton selected={isActive}>
                            <ListItemIcon>
                                <GroupOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Members" />
                        </ListItemButton>}
                    </NavLink>
                </List>
                <Divider />
            <Box 
            component={`main`}
            sx={{mt:4}}>
                <TaskProvider>
                <Outlet />
                </TaskProvider>
            </Box>
        </Box>
    )
}