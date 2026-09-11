import { Provider } from 'react-redux';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from '@/app/store';
import { theme } from "@/app/theme";

const queryClient = new QueryClient();

interface AppProviderProps {
    children : React.ReactNode;
}

export function AppProvider({ children }: AppProviderProps){
    return(
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    {children}
                </ThemeProvider>
            </QueryClientProvider>
        </Provider>
    )
}