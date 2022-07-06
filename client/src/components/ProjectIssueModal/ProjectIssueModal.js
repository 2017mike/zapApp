import './ProjectIssueModal.css'
import React, { useState, useEffect } from 'react';
// ====================== Material UI cores ======================
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import FaceIcon from '@material-ui/icons/Face';
import Spacer from '../../components/Spacer'
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
// ====================== API Calls ======================
import ReplyAPI from '../../utils/ReplyAPI'
import IssueAPI from '../../utils/IssueAPI'
// ====================== RTF Draft WYSIWYG Editor ======================
import { stateToHTML } from 'draft-js-export-html';
import { convertFromRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

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
  issueleft: {
    paddingRight: 20,
    borderRight: '1px solid #ccc',
  },
  issueright: {
    paddingLeft: 20,
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
    fontSize: 12,
    textAlign: 'center',
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
    minWidth: 100,
  },
  selectEmpty: {
    marginTop: 20,
  },
  hidden: {
    display: 'none'
  },
  comments: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginBottom: 12,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 8,
    paddingBottom: 8,
  },
  right: {
    textAlign: 'right',
  },
  publicCSS: {
    fontWeight: 600,
  },
  tiny: {
    fontSize: 10,
  },
  replytext: {
    fontSize: 12,
  }
});



const ProjectModal = props => {
  const classes = useStyles();
  // console.log(props)
  const [issueState, setIssueState] = useState({
    title: '',
    body: '',
    status: '',
    priority: '',
    issue: []
  })

  // For the Status dropdown
  const [openStatus, setStatusOpen] = useState(false);

  const handleInputChange = ({ target }) => {
    setIssueState({ ...issueState, [target.name]: target.value })
  }

  const [open, setOpen] = useState(false);

  const [deleteConfirm, setDeleteConfirm] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleStatusOpen = () => {
    setStatusOpen(true);
  };

  const handleClose = () => {
    setStatusOpen(false);
    setOpen(false)
    setDeleteConfirm(false)
  };
  
  const [issueStatus, setIssueStatus] = useState(props.status)
  const [issuePriority, setIssuePriority] = useState(props.priority)


  function handleIssuePriority(e) {
    setIssuePriority(e.target.value)
  }

  function handleIssueStatus(e) {
    setIssueStatus(e.target.value)
  }

  const handleDeleteIssue = () => {
  
    console.log(props.id, 'this is issue id')
    IssueAPI.delete(props.id)
      .then(res => {
        console.log(res)
        let newIssues = props.issues.filter(issue => 
          issue._id !== res.data._id
        )
        props.setIssues(newIssues)
        // props.handleClose()
      })
      .catch(err => console.log(err))
  }
  


  const [issuePublic, setIssuePublic] = useState(true);
  const [showEditTitle, setShowEditTitle] = useState(false)
  const [showEditDesc, setShowEditDesc] = useState(false)

  const handleGoPublic = () => {
    IssueAPI.update(props.id, {
      isPublic: issuePublic
    })
      .then(res => {
        handleClose()
        window.location = '/help'
      })
      .catch(err => console.log('Problem in the ProjectIssueModal', err))


  }

  const handleUpdateIssue = () => {
    IssueAPI.update(props.id, {
      status: issueStatus,
      priority: issuePriority
    })
      .then(res => {
        console.log('status priority updated - ProjectIssueModal', res)
        // if(props.issues){
        let newIssues = props.issues.map(issue=> {
          if(issue._id !== res.data._id) {
            return issue
          }
          return res.data
        })
        props.setIssues(newIssues)
      // }
        // props.handleClose()
      })
      .catch(err => console.log('Problem in the ProjectIssueModal', err))

  }

  const [replies, setReplies] = useState([]);

  useEffect(() => {
    IssueAPI.getById(props.id)
    .then((res) => {
      setReplies(res.data.replies)
    })
    .catch(e => console.error(e))
  }
    , [])

  const handleDeleteOpen = () => {
    setDeleteConfirm(true)
  }

  const handleEditIssue = () => {
    setShowEditTitle(true)
    setShowEditDesc(true)
  }
  
  const obj = {
    Low: "#14a7fc",
    Medium: "#f79d0c",
    High: "red",
  }


  // Replies
  const [issueReply, setIssueReply] = useState(EditorState.createEmpty());

  function handleIssueReply(e) {
    setIssueReply(e.target.value)
  }

  function submitIssueReply(e) {
    ReplyAPI.create({
      text: convertToRaw(issueReply.getCurrentContent()),
      pid: props.id
    })
      .then(reply => {
        // console.clear()
        console.log(reply.data)
        const newReplies = [...replies, reply.data]
        setReplies(newReplies)
        setIssueReply(EditorState.createEmpty())
      })
  }

  // For RTF Editor
  const convertFromJSONToHTML = (text) => {
    try {
      // console.log('this is not converted text', text)
      // console.log('this is converted text', stateToHTML(convertFromRaw(text)))
      return { __html: stateToHTML(convertFromRaw(text)) }
    } catch (exp) {
      console.log(exp)
      return { __html: 'Error' }
    }
  }

  function myBlockStyleFn(contentBlock) {
    const type = contentBlock.getType();
    if (type === 'code') {
      return 'superFancyBlockquote';
    }
  }

  const publicColor = {
    true: "rgb(113, 153, 116)",
    false: "red",
  }

  const publicTag = {
    true: "Public",
    false: "Private"
  }

  return (
    <Dialog maxWidth='lg' fullWidth open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title" className='dialogtitle' style={{ borderColor: obj[props.priority] }}>
        <Grid container>
          <Grid item xs={12} md={11} lg={11}>
            {props.title}
          </Grid>
          <Grid item xs={12} md={1} lg={1} className={classes.right}>
            <Chip
              label={publicTag[props.isPublic]}
              size='small'
              variant="outlined"
              className={classes.publicCSS}
              style={{ color: publicColor[props.isPublic] }}
            />
          </Grid>
        </Grid>
      </DialogTitle>


      <DialogContent>
        <DialogContentText>
          <Grid container>
            <Grid className={classes.issueleft} item xs={12} lg={9}>

              <div dangerouslySetInnerHTML={convertFromJSONToHTML(props.body)} />

              <hr />

              <h4 style={{ marginBottom: 0 }}>Add Reply</h4>
              <Editor editorState={issueReply}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
                wrapperStyle={{ border: "1px solid #ccc", marginBottom: "20px" }}
                editorStyle={{ height: "120px", padding: "0 10px" }}
                customBlockRenderFunc={myBlockStyleFn}
                toolbar={{
                  options: ['inline', 'blockType', 'list', 'textAlign', 'emoji'],
                  inline: {
                    inDropdown: false,
                    options: ['bold', 'italic', 'underline', 'strikethrough']
                  },
                  blockType: { 
                    inDropdown: false,
                    options: ['Normal', 'H1', 'H2', 'H3', 'Blockquote'],
                   },
                  list: { inDropdown: true },
                  textAlign: { inDropdown: true },
                }}
                onEditorStateChange={editorState => setIssueReply(editorState)}
              />

              <div className={classes.right} >
                <Button color="primary" variant="contained" onClick={submitIssueReply}>Submit Reply</Button>
              </div>
              <h4 style={{ marginBottom: 0 }}>Replies</h4>
              <Paper style={{ maxHeight: 400, overflow: 'auto', boxShadow: 'none' }}>
                <List >

                  {
                    replies?.length ? replies.map((index, key) => {
                      // console.log('this is replies index', index)
                      let formatdate = new Date(index.createdAt)
                      let timestamp = formatdate.toLocaleString('en-US', { timeZone: 'PST' })
                      return (
                        
                        <Card key={key} className={classes.comments}>
                          <Box display="flex" flexDirection="row">
                            <div className={classes.issueleft} style={{ minWidth: 125 }}>
                              <Chip
                                label={index.author.name}
                                // label="Priyanka Superfragilisticexpialidocious"
                                size='small'
                                variant="outlined"
                                className={classes.replychip}
                              />
                              <p className={classes.tiny}>Posted on {timestamp}</p>
                            </div>
                            
                            <div className="replytext" dangerouslySetInnerHTML={convertFromJSONToHTML(index.text)} />
                            </Box>
                        </Card>
                        
                      )
                    })
                      : null
                  }

                </List>
              </Paper>
            </Grid>
            <Grid className={classes.issueright} item xs={12} lg={3}>
              <Spacer y={1} />
              <Typography className={classes.title} color="textSecondary">
                Posted by
              </Typography>
              <Chip
                icon={<FaceIcon />}
                clickable
                label={props.author}
                variant="outlined"
              />
              <Spacer y={2} />

              <Typography className={classes.title} color="textSecondary">
                Status
              </Typography>
              {/* <Button
                variant="contained"
                color="primary"
                onChange={handleInputChange}
                endIcon={<Icon>expand_more</Icon>}
                onClick={handleStatusOpen}
              >
                {props.status}
              </Button> */}
              <p><FormControl className={classes.formControl}>
                <Select
                  id="status"
                  defaultValue={props.status}
                  onChange={handleIssueStatus}
                  fullWidth
                  open={openStatus}
                  onClose={handleClose}
                  onOpen={handleStatusOpen}
                // className={classes.hidden}
                >
                  <MenuItem value="Open">
                    Open
                  </MenuItem>
                  <MenuItem value="In Progress">
                    In Progress</MenuItem>
                  <MenuItem value="Closed">
                    Closed</MenuItem>
                </Select>
              </FormControl></p>

              <Spacer y={2} />


              <Typography color="textSecondary">
                Priority
              </Typography>

              <FormControl className={classes.formControl}>
                <Select
                  id="priority"
                  defaultValue={props.priority}
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
              <Spacer y={4} />
              <Typography className={classes.title} color="textSecondary">
                Ask the Community
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                className={classes.ask}
                onClick={handleClickOpen}
              >
                Ask the Community
              </Button>
              <Dialog
                open={open}
                onClose={props.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">{"Are You Sure You Want To Ask The Community"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Once you confirm, this issue will be public in the community-issues page.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Keep Private
                  </Button>
                  <Button onClick={handleGoPublic} color="primary" variant="contained" autoFocus>
                    Go Public
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
          </Grid>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDeleteOpen} color="primary">
          Delete
        </Button>
        <Dialog
          open={deleteConfirm}
          onClose={props.handleClose}
          aria-labelledby="delete"
          aria-describedby="delete"
        >
          <DialogTitle id="delete">{"Do You Wish To Delete?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="delete">
              Once you delete, this issue will be permanently deleted.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={handleDeleteIssue} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
        <Button onClick={props.handleClose} color="primary">
          Cancel
        </Button>
        {/* <Button onClick={handleEditIssue} color="primary">
          Edit
        </Button> */}
        <Button onClick={handleUpdateIssue} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ProjectModal