import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"

import { Alert, Button, Stack, TextField, IconButton, InputAdornment } from "@mui/material";

import {type LoginFormData, loginSchema } from "@/features/auth/schemas/authSchemas";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { login } from "@/features/auth/api/authApi";
import axios from "axios";

function LoginForm(){
    const { register, handleSubmit, formState:{errors, isSubmitting},} = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues:{
            email:"",
            password:"",
        }
    })

    const [loginError, setLoginError] = useState("");

    const onSubmit = async (data: LoginFormData) => {
        try{
            setLoginError("");
            const response = await login(data);
            console.log(response);
        }catch(error){
            if(axios.isAxiosError(error)){
                if(!error.response){
                    setLoginError("Unable to connnect to the server. Please try again.")
                    return;
                }

                if(error.response?.status === 401){
                    setLoginError("Invalid email or password")
                    return;
                }

                if(error.response?.status === 400){
                    setLoginError("Please check your login details");
                    return;
                }

                setLoginError("Something went wrong. Please try again.");
                return;
            }
            
            setLoginError("Unable to sign in. Please try again")
     }
    }

const [showPassword, setShowPassword] = useState(false);

return(
    <Stack
    component={`form`}
    spacing={2}
    onSubmit={handleSubmit(onSubmit)}
    >
        {loginError && (
            <Alert severity="error">
                {loginError}
            </Alert>
        )}
        <TextField 
            label="Email"
            type="email"
            fullWidth
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
        />

        <TextField 
            label="Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            slotProps={{
                input:{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                            onClick={()=> setShowPassword((prev)=> !prev)}
                            edge="end"
                            aria-label={
                                showPassword ? "Hide password" : "Show password"
                            }
                            >
                                {showPassword ? (
                                    <VisibilityOffIcon /> 
                                ) : (
                                    <VisibilityIcon />
                                )
                            }
                            </IconButton>
                        </InputAdornment>
                    )
                }
            }}
        />

        <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={isSubmitting}
        >
            {isSubmitting ? "Signing in...." : "Sign"}
        </Button>
    </Stack>
)
}

export default LoginForm;

