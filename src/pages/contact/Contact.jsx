import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';

const backgroundImage = 'url("https://i.ibb.co/dLfZGkP/resul-mentes-Dbw-YNr8-RPbg-unsplash.jpg")';

const Contact = () => {
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setDrawerOpen(!isDrawerOpen);
    };
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        const { name, email, message } = formData;

        if (name && email && message) {

            Swal.fire("Thank You for contacting us!! We'll reach out to you");
        } else {

            Swal.fire('Please fill in all fields before submitting.');
        }
    };
    return (
        <div style={{ background: backgroundImage, backgroundSize: 'cover', minHeight: '100vh' }} className='p-32'>
            <Helmet>
                <title>CareCamp || Contact Us</title>
            </Helmet>
            <Grid container spacing={3} justifyContent="center">
                <Button
                    onClick={toggleDrawer}
                    variant="outlined"
                    fullWidth
                    style={{ marginTop: '16px', backgroundColor: '#002f6c', color: '#fff' }}
                    className='max-w-2xl'
                >
                    Click here to see Contact Information
                </Button>
                <Grid item xs={12} sm={8} md={6}>
                    <Paper elevation={3} style={{ padding: '20px', textAlign: 'center', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
                        <Typography variant="h4" gutterBottom>
                            Contact Us
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            If you have any questions or inquiries, please feel free to contact us using the form below.
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Name"
                                variant="outlined"
                                name="name"
                                fullWidth
                                margin="normal"
                                required
                                onChange={handleInputChange}
                            />
                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                name="email"
                                margin="normal"
                                required
                                type="email"
                                onChange={handleInputChange}
                            />
                            <TextField
                                label="Message"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                required
                                name="message"
                                multiline
                                rows={4}
                                onChange={handleInputChange}
                            />
                            <Box mt={2} mb={2}>
                                <FormControlLabel
                                    control={<Checkbox required color="primary" />}
                                    label="I agree to the Terms and Conditions"
                                />
                            </Box>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                startIcon={<SendIcon />}
                                onClick={handleSubmit}
                            >
                                Send


                            </Button>
                        </form>
                    </Paper>
                </Grid>
            </Grid>

            <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer} PaperProps={{ style: { background: '#57A0D2', color: '#fff' } }}>
                <List>
                    <ListItem>
                        <ListItemIcon>
                            <MailOutlineIcon />
                        </ListItemIcon>
                        <ListItemText primary="Email: careCamp@gmail.com" />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <PhoneIcon />
                        </ListItemIcon>
                        <ListItemText primary="Phone: +1 (123) 456-7890" />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <LocationOnIcon />
                        </ListItemIcon>
                        <ListItemText primary="Address: 123 Gulshan, Main Street, Dhaka, Bangladesh" />
                    </ListItem>
                </List>
            </Drawer>
        </div>
    );
};

export default Contact;