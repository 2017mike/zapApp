import './Dashboard.css';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ProjectIssue from '../../components/ProjectIssue'
import CommunityIssueCard from '../../components/CommunityIssueCard'
import CommunityIssueModal from '../../components/CommunityIssueModal'
import ProjectCard from '../../components/ProjectCard'
import ProjectIssueModal from '../../components/ProjectIssueModal'
import Spacer from '../../components/Spacer'
import UserAPI from '../../utils/UserAPI'
import IssueAPI from '../../utils/IssueAPI'
import Card from '@material-ui/core/Card';
import MoreCard from '../../components/MoreCard'
import NewProjectModal from '../../components/NewProjectModal'
import Box from '@material-ui/core/Box';
// eslint-disable-next-line
import {
  Link
} from "react-router-dom";

const useStyles = makeStyles({
  projectcard: {
    padding: 10,
  }
})

const Dashboard = () => {
  const classes = useStyles();

  //projectState is referring to the user's projects that they own or are a part of
  const [projectState, setProjectState] = useState([]);

  //issueState is referring to community issues
  const [issueState, setIssueState] = useState([]);

  //projectIssueState is referring to personal project issues
  const [projectIssueState, setProjectIssueState] = useState([]);

  //we need myId to make sure that we are not showing the user's own issues in the "Help Answer Other's Issues" section
  const [myid, setMyId] = useState("");

  //if the user has no projects, the option to add a new project will appear. Therefore we also need the modal to create a new project.
  const [openNewProjectModal, setNewProjectModalOpen] = useState(false);

  // ===================== Modals =====================

  //used to open modal for project issues
  const handleIssueOpen = (_id) => {
    let issues = projectIssueState;
    issues = issues.map((issue) => {
      if (_id === issue._id) {
        issue.isOpen = !issue.isOpen;
      }
      return issue;
    });
    setProjectIssueState(issues);
  };

  //used to open modal for community issues
  const handleCommunityIssueOpen = (_id) => {
    let issues = issueState;
    issues = issues.map((issue) => {
      if (_id === issue._id) {
        issue.openCommunity = !issue.openCommunity;
      }
      return issue;
    });
    setIssueState(issues);
  };

  // Get Info

  const handleNewProjectModalOpen = () => {
    setNewProjectModalOpen(true);
  };

  useEffect(() => {
    IssueAPI.getAllPublic()
      .then(({ data: issues }) => {
        issues.map((issue) => ({
          ...issue,
          openCommunity: false,
        }));
        issues.reverse();
        setIssueState(issues);
      })
      .catch((err) => console.log(err));
    //gets the users info including their issues
    UserAPI.me()
      .then((res) => {
        const project = res.data;
        project.issues = res.data.issues.map((issues) => ({
          ...issues,
          isOpen: false,
          openCommunity: false,
        }));
        project.projects.reverse();
        project.issues.reverse();

        setProjectIssueState(project.issues);
        setProjectState(res.data.projects);
        setMyId(res.data._id);
      })
      .catch((err) => console.log("useEffect UserAPI.me err", err));
  }, []);

  return (
    <>
      <h1>Dashboard</h1>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h6" component="h2">
            My Projects
          </Typography>
        </Grid>

        {projectState?.length ? (
          projectState.slice(0, 5).map((projectData) => (
            <Grid
              className={classes.projectcard}
              item
              xs={12}
              sm={4}
              md={4}
              lg={2}
            >
              <Link to={`/project/${projectData._id}`}>
                <ProjectCard
                  key={projectData._id}
                  title={projectData.title}
                  description={projectData.description}
                  owner={projectData.owner.name}
                />
              </Link>
            </Grid>
          ))
        ) : (
          <>
            <Link onClick={handleNewProjectModalOpen}>
              <MoreCard clickable />
            </Link>
            <NewProjectModal
              open={openNewProjectModal}
              projectState={projectState}
              setProjectState={setProjectState}
              //firstProject is here because newProjectModal is also used in the Projects page.
              handleClose={() => setNewProjectModalOpen(false)}
            />
          </>
        )}
      </Grid>
      <Spacer y={4} />
      <Grid container>
        <Grid item xs={12} lg={8} md={7} sm={7}>
          <Grid container>
            {/* Project Issues */}
            <Grid item xs={12} lg={8} md={7} sm={7}>
              <Typography variant="h6" component="h2">
                Open Project Issues
              </Typography>
            </Grid>
          </Grid>
          <Spacer y={1} />

          {projectIssueState?.length ? (
            projectIssueState
              .filter((issue) => issue.status === "Open")
              .slice(0, 8)
              .map((issueData) => (
                <>
                  <Link onClick={() => handleIssueOpen(issueData._id)}>
                    <ProjectIssue
                      key={issueData.id}
                      id={issueData._id}
                      title={issueData.title}
                      priority={issueData.priority}
                      status={issueData.status}
                      date={issueData.createdAt}
                      author={issueData.author.name}
                      project={issueData.pid}
                    />
                  </Link>

                  <ProjectIssueModal
                    id={issueData._id}
                    title={issueData.title}
                    body={issueData.body}
                    author={issueData.author.name}
                    status={issueData.status}
                    isPublic={issueData.isPublic}
                    date={issueData.createdAt}
                    replies={issueData.replies}
                    issues={projectIssueState}
                    setIssues={setProjectIssueState}
                    // authorusername={issueData.author.username}
                    priority={issueData.priority}
                    open={issueData.isOpen}
                    handleClose={() => handleIssueOpen(issueData._id)}
                  />
                </>
              ))
          ) : (
            <>
              <Card style={{ fontSize: 22, padding: 20, textAlign: "center" }}>
                No issues to show!
              </Card>
            </>
          )}
        </Grid>
        <Box m={2} />
        {/* Community Issues */}
        <Grid item xs={12} lg={3} md={4} sm={4}>
          <Typography variant="h6" component="h2">
            Help Answer Others' Issues
          </Typography>
          <Spacer y={1} />
          {issueState
            .filter(
              (issue) => issue.status !== "Closed" && issue.author._id !== myid
            )
            .slice(0, 8)
            .map((issueData) => (
              <>
                <Link onClick={() => handleCommunityIssueOpen(issueData._id)}>
                  <CommunityIssueCard
                    key={issueData.id}
                    id={issueData._id}
                    title={issueData.title}
                    body={issueData.body}
                    status={issueData.status}
                    date={issueData.createdAt}
                    author={issueData.author.name}
                    replycount={issueData.replies.length}
                  />
                </Link>

                <CommunityIssueModal
                  id={issueData._id}
                  title={issueData.title}
                  body={issueData.body}
                  status={issueData.status}
                  date={issueData.createdAt}
                  author={issueData.author.name}
                  replies={issueData.replies}
                  open={issueData.openCommunity}
                  handleClose={() => handleCommunityIssueOpen(issueData._id)}
                />
              </>
            ))}

          <Spacer y={1} />
        </Grid>
      </Grid>
    </>
  );
}

export default Dashboard