import React, { useState, useEffect } from 'react';
// ====================== Material UI cores ======================
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
// ====================== API Calls ======================
import Issue from '../../utils/IssueAPI'
import ProjectAPI from '../../utils/ProjectAPI'
// eslint-disable-next-line
import {
  Route,
  Link,
  useParams
} from "react-router-dom";
// ====================== RTF Draft WYSIWYG Editor ======================
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { stateToHTML } from 'draft-js-export-html'


const useStyles = makeStyles({
  root: {
    minWidth: 175,
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    height: 200,
  },
  title: {
    fontSize: 14,
  },
  mb: {
    marginBottom: 20,
  },
  right: {
    textAlign: 'right',
  },
  issueleft: {
    paddingRight: 20,
  },
  issueright: {
    paddingLeft: 20,
    borderLeft: '1px solid #ccc',
  },
  issuerightchip: {
    marginBottom: 20,
    borderLeft: '1px solid #ccc',
  },
  projectcard: {
    marginRight: 20,
    marginBottom: 20,
  },
  codebox: {
    border: '1px solid #ddd',
    borderLeft: '3px solid blue',
    padding: 20,
    fontFamily: 'monospace',
    backgroundColor: '#eee'
  },
  priority: {
    marginRight: 10,
    color: 'red',
    fontWeight: '800'
  },
  highpriority: {
    fontSize: 12,
    textAlign: 'center',
    marginRight: 10,
    color: 'red',
    fontWeight: '800'
  },
  mediumpriority: {
    fontSize: 12,
    textAlign: 'center',
    marginRight: 10,
    color: '#f79d0c',
    fontWeight: '800'
  },
  lowpriority: {
    fontSize: 12,
    textAlign: 'center',
    marginRight: 10,
    color: '#14a7fc',
    fontWeight: '800'
  },
  ask: {
    backgroundColor: 'red',
    width: '90%'
  },
  addbtn: {
    textAlign: 'center',
    margin: 'auto'
  },
  editbtn: {
    textAlign: 'right',
  },
  formControl: {
    marginBottom: 10,
    // minWidth: 220,
    width: '100%',
    fontSize: 12,
    textAlign: 'left',
  },
  selectEmpty: {
    marginTop: 20,
  },
});



const SetModal = props => {
  const classes = useStyles();

  // issueState
  const [issueTitle, setIssueTitle] = useState("");
  const [issueDescription, setIssueDescription] = useState(EditorState.createEmpty())

  const [issuePriority, setIssuePriority] = useState('Medium');

  // eslint-disable-next-line
  const [status, setStatus] = useState({ isLoading: true })
  const params = useParams()

  useEffect(() => {
    ProjectAPI.getById(`${params.projectId}`)
      .then(res => {
        setStatus({ project: res.data })
      })
      .catch(err => setStatus({ err: err }))
  }, [])
  
  function handleIssueTitle(e) {
    setIssueTitle(e.target.value)
  }

  function handleIssueDescription(e) {
    setIssueDescription(e.target.value)
  }

  function handleIssuePriority(e) {

    setIssuePriority(e.target.value)
  }

 
  function handleAddIssue(e) {
    const newIssue = Issue.create({
      title: issueTitle,
      body: convertToRaw(issueDescription.getCurrentContent()),
      priority: issuePriority,
      isPublic: false,
      status: 'Open',
      pid: params.projectId
    })
    .then(response=> {
      props.setIssues([...props.issues, response.data]);
    })
    props.handleClose()
  }


  return (
    <Dialog maxWidth='sm' fullWidth open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add Issue</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Grid container>
            <Grid className={classes.issueleft} item xs={12}>
              <Typography className={classes.mb}>
                <form>
                  <p>
                    <TextField
                      id="title"
                      label="Title"
                      variant="outlined"
                      name='title'
                      fullWidth
                      onChange={handleIssueTitle}
                    />
                  </p>

                  {/* <Editor 
                    editorState={issueDescription}
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class"
                    toolbarClassName="toolbar-class"
                    wrapperStyle={{ border: "2px solid green", marginBottom: "20px" }}
                    editorStyle={{ height: "300px", padding: "10px" }}
                    toolbar={{
                      inline: { inDropdown: true },
                      list: { inDropdown: true },
                      textAlign: { inDropdown: true },
                      link: { inDropdown: true } }}
                    onEditorStateChange={editorState => setIssueDescription(editorState)}
                  /> */}

                  <Editor editorState={issueDescription}
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class"
                    toolbarClassName="toolbar-class"
                    wrapperStyle={{ border: "1px solid #ccc", marginBottom: "20px" }}
                    editorStyle={{ height: "300px", padding: "10px" }}
                    toolbar={{
                      inline: { inDropdown: true },
                      list: { inDropdown: true },
                      textAlign: { inDropdown: true },
                      link: { inDropdown: true },
                      history: { inDropdown: true },
                    }}
                    onEditorStateChange={editorState => setIssueDescription(editorState)}
                  />

                </form>
              </Typography>

            <div className={classes.right}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="priority-label">Priority</InputLabel>
                <br />
                <Select
                  labelId="priority-label"
                  id="priority"
                  defaultValue="Medium"
                  onChange={handleIssuePriority}
                  fullWidth
                >
                  <MenuItem value="High">
                    <Icon className={classes.highpriority}>radio_button_unchecked</Icon> High
                  </MenuItem>
                  <MenuItem value="Medium">
                    <Icon className={classes.mediumpriority}>radio_button_unchecked</Icon> Medium</MenuItem>
                  <MenuItem value="Low">
                    <Icon className={classes.lowpriority}>radio_button_unchecked</Icon> Low</MenuItem>
                </Select>
              </FormControl>
            </div>
            </Grid>
          </Grid>
        </DialogContentText>

      </DialogContent>
      <DialogActions>
        <Button onClick={handleAddIssue}  color="primary" variant="contained">
          Add Issue
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default SetModal