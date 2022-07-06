import './CommunityIssueModal.css'
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
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
// ====================== Material UI icons ======================
import FaceIcon from '@material-ui/icons/Face';
// ====================== API Calls ======================
import Spacer from '../../components/Spacer'
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
    paddingBottom: 0,
  },
  issueright: {
    textAlign: 'right',
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
    margin: 10,
    minWidth: 120,
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
  status: {
    fontWeight: 500,
  },
  tiny: {
    fontSize: 10,
  },
  replytext: {
    fontSize: 12,
  },
  right: {
    textAlign: 'right',
  }
});




const CommunityIssueModal = props => {
  const classes = useStyles();

  const [issueState, setIssueState] = useState({
    title: '',
    body: '',
    status: '',
    priority: '',
    issue: []
  })

  const [replies, setReplies] = useState([]);

  useEffect(() => {
    IssueAPI.getById(props.id)
      .then((res) => {
        setReplies(res.data.replies)
      })
      .catch(e => console.error(e))
  }
    // eslint-disable-next-line
    , [])


  // For the Status dropdown
  const [openStatus, setStatusOpen] = useState(false);

  const handleInputChange = ({ target }) => {
    setIssueState({ ...issueState, [target.name]: target.value })
  }

  const handleStatusOpen = () => {
    setStatusOpen(true);
  };

  const handleClose = () => {
    setStatusOpen(false);
  };

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
        // console.log('CIM reply.data', reply.data)
        const newReplies = [...replies, reply.data]
        setReplies(newReplies)
        setIssueReply(EditorState.createEmpty())
    })
    .catch(err => console.log('err with SubmitIssueReply in CIM', err))
  }

  // priority
  const [issuePriority, setIssuePriority] = useState(props.priority);
  const handlePriorityChange = ({ target }) => {
    setIssuePriority({ ...issuePriority, [target.name]: target.value })
  }

  const [issueStatus, setIssueStatus] = useState(props.status);

  function handleIssuePriority(e) {
    setIssuePriority(e.target.value)
  }

  const handleUpdateIssue = () => {
    IssueAPI.update(props.id, {
      status: 'Closed',
      priority: 'Low'
    })
      .then(res => {
        console.log('issue allegedly updated - ProjectIssueModal', res)
      })
      .catch(err => console.log('Problem in the ProjectIssueModal', err))

  }

  useEffect(() => {
    IssueAPI.getById(props.id)
      .then((res) => {
        setReplies(res.data.replies)
        // console.clear();
        })
      .catch(e => console.error('useEffect error', e))
  }
    // eslint-disable-next-line
    , [])


  const obj = {
    Open: "#719974",
    InProgress: "#f79d0c",
    Closed: "red"
  }

  let formatdate = new Date(props.date)
  let timestamp = formatdate.toLocaleString('en-US', { timeZone: 'PST' })

  // For RTF Editor
  const convertFromJSONToHTML = (text) => {
    try {
      return { __html: stateToHTML(convertFromRaw(text)) }
    } catch (exp) {
      console.log('convert error', exp)
      return { __html: 'Error' }
    }
  }

  return (
    <Dialog maxWidth='md' fullWidth open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title" className='communitycard' style={{ borderColor: obj[props.status] }}>
        <Grid container>
          <Grid item xs={12} md={11} lg={11}>
            {props.title}
            <Spacer y={1} />
            <Typography className={classes.title} color="textSecondary">
              Posted by <Chip
                // icon={<FaceIcon />}
                size='small'
                label={props.author}
                variant="outlined"
              /> on {timestamp}  
            </Typography>
          </Grid>
          <Grid item xs={12} md={1} lg={1} className={classes.issueright}>
            <Chip
              label={props.status}
              size='small'
              variant="outlined"
              className={classes.status}
              style={{ color: obj[props.status] }}
            />
          </Grid>
        </Grid>
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          
            <div dangerouslySetInnerHTML={convertFromJSONToHTML(props.body)} />

            <hr />

          <h4 style={{ marginBottom: 0 }}>Replies</h4>

            <Editor editorState={issueReply}
              wrapperClassName="wrapper-class"
              editorClassName="editor-class"
              toolbarClassName="toolbar-class"
              wrapperStyle={{ border: "1px solid #ccc", marginBottom: "20px" }}
              editorStyle={{ height: "150px", padding: "0 10px" }}
              toolbar={{
                options: ['inline', 'blockType', 'list', 'textAlign', 'emoji'],
                inline: {
                  inDropdown: false,
                  options: ['bold', 'italic', 'underline', 'strikethrough']
                },
                blockType: { inDropdown: false, options: ['Normal', 'H1', 'H2', 'H3', 'Blockquote'], },
                list: { inDropdown: true },
                textAlign: { inDropdown: true },
              }}
              onEditorStateChange={editorState => setIssueReply(editorState)}
            />

            

            <div className={classes.right} >
              <Button color="primary" variant="contained" onClick={submitIssueReply}>Submit Reply</Button>
            </div>

          <h4 style={{ marginBottom: 0 }}>Add Reply</h4>
              <Paper style={{ maxHeight: 400, overflow: 'auto', boxShadow: 'none' }}>
                <List >
              {
                replies?.length ? replies.map((index, key) => {
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
            

        </DialogContentText>

      </DialogContent>
      <DialogActions>
        {/* <Button onClick={props.handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleUpdateIssue} color="primary">
          Save
        </Button> */}
      </DialogActions>
    </Dialog>
  )
}

export default CommunityIssueModal