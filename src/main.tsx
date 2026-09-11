import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppProvider } from "@/app/providers/AppProvider";
import './index.css'
// import App from './App.tsx'
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router/routes.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={router}/>
    </AppProvider>
  </StrictMode>,
)
