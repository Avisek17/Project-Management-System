import LoginPage from '@/features/auth/pages/LoginPage';
import DashboardPage from '@/features/dashboard/pages/DashboardPage';
import ProjectLayout from '@/features/projects/layouts/ProjectLayout';
import ProjectBoardPage from '@/features/projects/pages/ProjectBoardPage';
import ProjectMembersPage from '@/features/projects/pages/ProjectMembersPage';
import ProjectOverviewPage from '@/features/projects/pages/ProjectOverviewPage';
import ProjectPage from '@/features/projects/pages/ProjectPage';
import ProjectTasksPage from '@/features/projects/pages/ProjectTasksPage';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import AppLayout from '@/app/layouts/AppLayouts';

export const router = createBrowserRouter([
    {
        path:"/",
        element: <Navigate to="/dashboard" replace />
    },
    {
        path:"/login",
        element: <LoginPage />
    },
    {
        element:<AppLayout />,
        children:[
            {
                path:"/dashboard",
                element: <DashboardPage />
            },
            {
                path:"/projects",
                element: <ProjectPage />
            },
            {
                path:"/projects/:projectId",
                element:<ProjectLayout />,
                children:[
                    {
                        index: true,
                        element:<ProjectOverviewPage />
                    },
                    {
                        path:"board",
                        element: <ProjectBoardPage />
                    },
                    {
                        path:"members",
                        element:<ProjectMembersPage />
                    },
                    {
                        path:"tasks",
                        element: <ProjectTasksPage />
                    }
                ]
            }
        ]
    },
])