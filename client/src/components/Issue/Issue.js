import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
// ====================== RTF Draft WYSIWYG Editor ======================
import { stateToHTML } from 'draft-js-export-html';
import { convertFromRaw } from 'draft-js'

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    marginBottom: 12,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 12,
  },
  issue: {
    
  },
  priority: {
    fontSize: 13,
    textAlign: 'center',
    marginRight: 10,
    fontWeight: '800'
  },
});


const Issue = props => {
  const classes = useStyles();

  const obj = {
    Medium: "#e3b912",
    High: "red",
    Low: "#14a7fc"
  }

  // console.log('this is props in Issues', props)

  const convertFromJSONToHTML = (text) => {
    try {
      return { __html: stateToHTML(convertFromRaw(text)) }
    } catch (exp) {
      console.log(exp)
      return { __html: 'Error' }
    }
  }

  return(
    <Card className={classes.root}>
      <CardContent>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
        >

          <Grid item className={classes.issue} xs={12}>
            <Icon className={classes.priority} style={{ color: obj[props.priority] }}>radio_button_unchecked</Icon>
          
            {props.title}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default Issue