import { Box, Paper, Typography } from "@mui/material";
import LoginForm from "@/features/auth/components/LoginForm";
function LoginPage(){
    return (
        <Box sx={{
            minHeight:"100vh",
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            p:2
        }}>
            <Paper 
            elevation= {3}
            sx={{
                width:"100%",
                maxWidth:420,
                p:4
            }}>
                <Typography variant="h4" sx={{mb:1}}>Welcome Back</Typography>
                <Typography variant="body2" 
                color="text.secondary"
                sx={{
                    mb:3
                }}
                >
                    Sign in to your account to continue.
                </Typography>

                <LoginForm />
            </Paper>
        </Box>
    )
}
export default LoginPage;