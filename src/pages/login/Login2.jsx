import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LoadCanvasTemplate, loadCaptchaEnginge, validateCaptcha } from 'react-simple-captcha';
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { AuthContext } from "../../Providers/Authprovider";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UserData from '../../hooks/UserData';
import useAxiosSecure from '../../hooks/AxiosSecure';




const defaultTheme = createTheme();

const Login2 = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signInUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [backgroundImage, setBackgroundImage] = useState('');
    const axiosSecure = useAxiosSecure();
    const [url, setUrl] = useState("");
    useEffect(() => {
        // Array of your 10 image URLs
        const myImages = [
            'https://i.ibb.co/Tw80Rx3/video1.gif',
            'https://i.ibb.co/RvzMHMS/vecteezy-management-analysis-control-assurance-business-organization-28716689.gif',
            'https://i.ibb.co/pvzCwgT/video3.gif',
            'https://i.ibb.co/cYBrXFV/ezgif-com-video-to-gif.gif'




        ];

        const randomNumber = Math.floor(Math.random() * 4);

        setBackgroundImage(myImages[randomNumber]);
    }, []);




    // const {  watch } = useForm();
    const from = location.state?.from?.pathname || "/";
    const onSubmit = (data, e) => {
        console.log(data);
        e.target.reset();
        signInUser(data.email, data.pass)
            .then(result => {

                updateUserProfile(data?.name, data?.photo);
                Swal.fire("User logged in successfully");


                axiosSecure.get(`user/${data.email}`)
                    .then(res => {
                        if (res?.data[0]?.role === "Participant") {
                      
                            return navigate("/participantDashboard/participant");
                        }
                        if (res?.data[0]?.role === "Organizer") {
                      
                            return navigate("/organizerDashboard/organizer");
                        }
                        if (res?.data[0]?.role === "Healthcare Professional") {
                      
                            return navigate("/professionalsDashboard/professional");
                        }

                        else {
                            setTimeout(function () {
                                navigate(from, { replace: true });
                            }, 2000);
                        }
                    })

                console.log(url)




            })
            .catch(error => {
                console.log(error);
                Swal.fire("Invalid login credentials");
                // Handle any other actions or UI updates related to the error here
            });
    }

    const [disabled, setDisabled] = useState(true)


    useEffect(() => {
        loadCaptchaEnginge(6);

    }, [])

    const handleCaptcha = () => {


        let captchaValue = document.getElementById('captcha').value;
        if (validateCaptcha(captchaValue, false) == true) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }



    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: `url(${backgroundImage})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>

                            <TextField
                                margin="normal"

                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                type='email'
                                autoComplete="email"
                                autoFocus
                                {...register("email", { required: true })}
                            />
                            {errors.email && <span className="text-red-600 mt-2">This field is required*</span>}
                            <TextField
                                margin="normal"

                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                {...register("pass", { required: true })}

                            />
                            {errors.pass && <span className="text-red-600 mt-2">This field is required*</span>}

                            <LoadCanvasTemplate />
                            <TextField
                                margin="normal"

                                fullWidth
                                name="captcha"
                                label="captcha"
                                type="text"
                                id="captcha"
                                autoComplete="Enter captcha"
                                onChange={handleCaptcha}
                            />

                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                disabled={disabled}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                            {/* <Copyright sx={{ mt: 5 }} /> */}
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default Login2;