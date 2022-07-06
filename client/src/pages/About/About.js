import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import CardActionArea from '@material-ui/core/CardActionArea';
import ContactForm from '../../components/ContactForm'

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 275,
  },
  icon: {
    marginRight: theme.spacing(2),
  },
 
  title: {
    marginTop: '4vh',
  },
  brand:{
    marginBottom: '4vh',
    marginTop: '2vh',
  },

  herocontent: {
    padding: theme.spacing(4),
    // marginRight: '2vh',
  },
  heroButtons: {
    marginTop: '7vh',
  },
  media: {
    height: 145,
  },
  profile: {
    borderRadius: 120,
    marginBottom: 12,
  },
  zapbrand: {
    maxHeight: '5vw',
  },
  padright: {
    marginRight: '2vh',
  },
 
}));

export default function About() {
  const classes = useStyles();

  // Modal: Open Contact Form
  const [openContact, setContactOpen] = useState(false);
  
  const handleContactOpen = () => {
    setContactOpen(true);
  };
  
  // eslint-disable-next-line
  const handleClose = () => {
    setContactOpen(false)
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Container maxWidth="lg">
            <Card className={classes.herocontent}>
            <Typography component="h1" variant="h2" align='center' className={classes.title} color="textPrimary">
              About
            </Typography>
            <Typography component="h1" variant="h2" align='center' className={classes.brand} color="textPrimary">
            <img src="https://i.imgur.com/Q0IAOwI.png" alt="brand" style={{ maxHeight: '4vh' }} />
            </Typography>
            <Typography variant="body1" align="left" color="textSecondary" paragraph>
              Zap is an app created to combine the project management and bug tracking aspects of app development. You can ask for help both within your group or ask the community. Our goal is to streamline the process of app development by giving you one place to manage projects and ask any and all questions related to development. Let's get Zapping!
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item>

                  <Link onClick={handleContactOpen}>
                    <Button 
                      variant="outlined" 
                      color="primary" 
                      >
                      Contact the ZAP team
                    </Button>
                  </Link>
                  <ContactForm 
                    open={openContact}
                    handleClose={() => setContactOpen(false)}
                  />

                </Grid>
              </Grid>
            </div>
            </Card>
          </Container>

        {/* End hero unit */}
        <Box m={3.2} />

      

        <Container className={classes.cardGrid} maxWidth="lg">
          <Grid
            container
            spacing={1}
            direction="row"
            justify="center"
            alignItems="center"
          >

            {[{
              name: 'Dia Seung',
              url: 'https://i.imgur.com/uRDhPgJ.jpeg',
              github: 'https://github.com/diaseu',
              linkedin: 'https://www.linkedin.com/in/dianaseung'
            }, {
              name: 'Michael Scharf',
              url: 'https://i.imgur.com/ZsTfgsV.png',
              github: 'https://github.com/2017mike',
              linkedin: 'https://www.linkedin.com/in/michael-scharf-398899111'
            }, {
              name: 'Sle Ahn',
              url: 'https://i.imgur.com/M7kQZ7q.jpeg',
              github: 'https://github.com/silentsonata92',
              linkedin: 'https://www.linkedin.com/in/sle-ahn'
            }, {
              name: 'Jake Eckfeldt',
              url: 'https://i.imgur.com/pju3WaK.png',
              github: 'https://github.com/JEckfeldt',
              linkedin: 'https://www.linkedin.com/in/JEckfeldt'
            }].map(column => (
              <>

                <Grid item xs={12} sm={6} md={3}>
                  <Card className={classes.team}>
                    <CardContent align='center'>
                      <img src={column.url} width="135" height="135" alt="" className={classes.profile} />

                      <Typography variant="h7" component="h3" align='center'>
                        {column.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component={'span'}>
                      </Typography>
                      <Button size="small" color="primary">
                        <Link href={column.linkedin} target="_blank">
                          LinkedIn
                        </Link>
                      </Button>
                      <Button size="small" color="primary">
                        <Link href={column.github} target="_blank" >
                          GitHub
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              </>
            ))}

          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}