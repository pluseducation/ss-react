import React, { useState } from 'react';
import useAuth from '../../hook/useAuth';
import axios from '../../api/axios';
import { GetLogin } from '../../api/login/loginService'

import {
    TextField,
    Button,
    Card,
    CardContent,
    CardActions,
    Typography,
    useTheme
} from '@mui/material';


const Login = () => {

    const [email, setEmail] = useState('ssadmin1');
    const [password, setPassword] = useState('p@ssw0rd');
    const {auth, setAuth} = useAuth();
    
    const handleSubmit = (event) => {
        event.preventDefault();
        GetLogin(email, password).then((value) => {
            let user = value.data.user.username;
            let accessToken = value.data.token.access_token;
            let pwd = '';
            let roles = value.data.user.role_id;
            setAuth({ user, pwd, roles, accessToken });
            console.log(value);
        });

    };

    // // test service
    // const testService = () => {
    //     try {
    //         axiosPrivate.get('/user/view-user')
    //             .then(res => {
    //                 console.log(res.data.data);
    //             })
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }

    // React.useEffect(() => {
    //     testService();
    // }, [])
    

    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="h1" align="center">
                    Login
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />
                    <TextField
                        label="Password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Login
                    </Button>
                </form>
            </CardContent>
            <CardActions>
                <Typography align="center">
                    Don't have an account? <a href="#">Sign up</a>
                </Typography>
            </CardActions>
        </Card>
    );
};

export default Login;
