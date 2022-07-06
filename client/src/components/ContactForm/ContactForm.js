import React from 'react';
import { Grid, TextField, Button, Typography } from '@material-ui/core';
import emailjs from "emailjs-com";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const ContactForm = props => {
    function sendEmail(e) {
        e.preventDefault();
        emailjs.sendForm('service_8q9l0zs', 'contact_form', e.target, 'user_vZh74YVKSJ1YNAd3JfGIx')
            .then((result) => {
            }, (error) => {
                console.log(error.text);
            });
            
        props.handleClose()
    }

    return (
        <Dialog maxWidth='sm' fullWidth open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title" align='center'>
            <DialogTitle id="form-dialog-title">Contact Us</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <Typography variant="body2" color="textSecondary" component={'span'}>
                        Fill out the contact form and our team will get back to you within 24-48 hours.
                    </Typography>
                    {/* Contact Form */}
                    <form onSubmit={sendEmail}>
                        <Grid container spacing={1}>
                            <Grid xs={12} sm={12} item>
                                <TextField placeholder="Enter your full name" label="Full name" variant="outlined" name='name' fullWidth required />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField type="email" placeholder="Enter email" label="Email" name ='email' variant="outlined" fullWidth required />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField type="subject" placeholder="Enter subject" label="Subject" variant="outlined" name='subject' fullWidth required />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField label="Message" multiline rows={4} placeholder="Type your message here" variant="outlined" name='message' fullWidth required />
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" value='Send Message' variant="contained" color="primary" fullWidth>Submit</Button>
                            </Grid>
                        </Grid>
                    </form>
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
}

export default ContactForm;