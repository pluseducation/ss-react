import React, { useState } from 'react';
import { Formik } from "formik";
import * as yup from "yup";
import useAuth from '../../hook/useAuth';
import axios from '../../api/axios';
import { GetLogin } from '../../api/login/loginService'

import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

import { Box, TextField, Button, InputAdornment, IconButton, Grid } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Login = () => {

    const { auth, setAuth } = useAuth();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [showPassword, setShowPassword] = useState(false);

    let username = 'ssadmin1'
    let password = 'p@ssw0rd'
    let value = { username, password }

    const handleFormSubmit = (value) => {

        GetLogin(value.username, value.password).then((value) => {
            let user = value.data.user.username;
            let accessToken = value.data.token.access_token;
            let pwd = '';
            let roles = value.data.user.role_id;
            console.log(value);
            setAuth({ user, pwd, roles, accessToken });
        });

    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
      };

    return (
        <Box flexGrow={1}
            width='100%'
            display='flex'
            flexDirection='column'
            height='100vh'
            justifyContent='center'
            alignItems='center'
            
            // sx={{
            //     background: colors.blueAccent[600]
            // }}
        >

            <Formik
                onSubmit={handleFormSubmit}
                initialValues={value}
                validationSchema={checkoutSchema}
                enableReinitialize={true}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                }) => (
                    <form onSubmit={handleSubmit}  >

                        <Box justifyContent='center' display='flex' maxWidth='sm' mb={2} >
                            <img src='/images/logo.png' width='70%' height='auto' ></img>
                        </Box>
                        <Box justifyContent='center'
                            flexDirection='column'
                            display="flex"
                            gap="30px"
                            p={3}
                            maxWidth='sm'

                        >
                            <TextField
                                type="text"
                                label='Username'
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.username}
                                name="username"
                                variant='outlined'
                                fullWidth
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircleIcon color='secondary' />
                                        </InputAdornment>
                                    ),
                                }}
                                error={!!touched.username && !!errors.username}
                                helperText={touched.username && errors.username}
                            />

                            <TextField
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.password}
                                name="password"
                                variant='outlined'
                                fullWidth
                                backgroundColor='black'
                                error={!!touched.password && !!errors.password}
                                helperText={touched.password && errors.password}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockIcon color='secondary' />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleTogglePasswordVisibility}>
                                                {showPassword ? <VisibilityOffIcon color='secondary' /> : <VisibilityIcon color='secondary' />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{ gridColumn: "span 12" }}
                            >
                                Sign In
                            </Button>
                        </Box>

                    </form>
                )}
            </Formik>
        </Box>
    );
};

const checkoutSchema = yup.object().shape({
    username: yup.string().required("required"),
    password: yup.string().required("required"),
});


export default Login;
