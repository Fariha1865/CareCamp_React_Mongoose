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

const backgroundImage = 'url("https://i.ibb.co/dLfZGkP/resul-mentes-Dbw-YNr8-RPbg-unsplash.jpg")';

const Contact = () => {
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setDrawerOpen(!isDrawerOpen);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
    };

    return (
        <div style={{ background: backgroundImage, backgroundSize: 'cover', minHeight: '100vh' }} className='p-32'>
            <Grid container spacing={3} justifyContent="center">
                <Button
                    onClick={toggleDrawer}
                    variant="outlined"
                    fullWidth
                    style={{ marginTop: '16px', backgroundColor: '#002f6c', color: '#fff' }}
                    className='max-w-2xl'
                >
                    Click to See Contact Information
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
                                fullWidth
                                margin="normal"
                                required
                            />
                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                required
                                type="email"
                            />
                            <TextField
                                label="Message"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                required
                                multiline
                                rows={4}
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