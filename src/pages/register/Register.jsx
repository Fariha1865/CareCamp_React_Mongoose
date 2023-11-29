
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
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { AuthContext } from "../../Providers/Authprovider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from '../../hooks/AxiosSecure';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';




const defaultTheme = createTheme();

const Register = () => {

    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    // const {  watch } = useForm();

    const onSubmit = (data, e) => {
        e.preventDefault();
        console.log(data);
        createUser(data?.email, data?.pass)
            .then(result => {

                console.log(result?.user);
                const user = {
                    name: data?.name,
                    email: data?.email,
                    role: data?.UserRole,
                    gender: data?.gender
                }
                updateUserProfile(data?.name, data?.photo);
                axiosSecure.post("/users", user)
                    .then(data => {
                        console.log(data.data)
                        Swal.fire("user created successfully");

                    })

                if (data?.UserRole === "Participant") {

                    return navigate("/participantDashboard/participant");
                }
                if (data?.UserRole === "Organizer") {

                    return navigate("/organizerDashboard/organizer");
                }
                if (data?.UserRole === "Healthcare Professional") {
                      
                    return navigate("/professionalsDashboard/professional");
                }
                else {
                    navigate("/");
                }

            })
        e.target.reset();
    }

    const [backgroundImage, setBackgroundImage] = useState('');

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
                                name="name"
                                label="name"
                                type="text"
                                id="name"
                                autoComplete="Enter UserName"
                                {...register("name", { required: true })}

                            />
                            {errors.name && <span className="text-red-600 mt-2">This field is required*</span>}
                            <TextField
                                margin="normal"

                                fullWidth
                                name="photo"
                                label="photo"
                                type="text"
                                id="photo"
                                autoComplete="Enter PhotoURL"
                                {...register("photo", { required: true })}

                            />
                            {errors.photo && <span className="text-red-600 mt-2">This field is required*</span>}
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
                                name="pass"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                {...register("pass", { required: true, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\-])(?=.*\d).*$/, minLength: 6 })}

                            />
                            {errors.pass?.type === 'required' && (
                                <span className="text-red-600 mt-2">This field is required</span>
                            )}
                            {errors.pass?.type === 'pattern' && (
                                <span className="text-red-600 mt-2">password must have: At-least one small letter, At-least one capital letter and At-least one digit and special character</span>
                            )}
                            {errors.pass?.type === 'minLength' && (
                                <span className="text-red-600 mt-2">Password must be greater or equal to 6 characters</span>
                            )}
                            <div className='my-3'>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">User Role</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="UserRole"
                                        name="role"
                                        {...register("role", { required: true })}
                                        onChange={(e) => setValue("UserRole", e.target.value)}
                                    >
                                        <MenuItem value={"Participant"}>Participant</MenuItem>
                                        <MenuItem value={"Organizer"}>Organizer</MenuItem>
                                        <MenuItem value={"Healthcare Professional"}>Healthcare Professional</MenuItem>
                                    </Select>
                                    {errors.role && <span className="text-red-600 mt-2">This field is required*</span>}
                                </FormControl>
                            </div>

                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="gender"
                                    name="gender"
                                    {...register("gender", { required: true })}
                                    onChange={(e) => setValue("gender", e.target.value)}
                                >
                                    <MenuItem value={"Male"}>Male</MenuItem>
                                    <MenuItem value={"Female"}>Female</MenuItem>

                                </Select>
                                {errors.gender && <span className="text-red-600 mt-2">This field is required*</span>}
                            </FormControl>


                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Accept Terms and Conditions*"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}

                            >
                                Sign Up
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link href="/login" variant="body2">
                                        {"Already have an account? Sign In"}
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

export default Register;