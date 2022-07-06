const router = require('express').Router()
const { Issue, Reply, Project, User } = require('../models')
const passport = require('passport')

//get all projects
// passport.authenticate('jwt'), 
// this might be useful for admin account :P
router.get('/projects', (req, res) => {
  Project.find({})
    .populate('owner')
    // .populate({
    //   path: 'members',
    //   model: 'User'
    // })
    .then(project => res.json(project))
    .catch(err => console.log(err))
})

// get project by id
router.get('/projects/:projectId', passport.authenticate('jwt'), (req, res) => {
  Project.findById(req.params.projectId)
    .populate('owner')
    .populate({
      path: 'members',
      model: 'User'
    })
    .populate({
      path: 'issues',
      model: 'Issue',
      populate: [
        {
          path: 'author',
          model: 'User'
        },
        {
          path: 'replies',
          model: 'Reply',
          populate: {
            path: 'author',
            model: 'User'
          }
        }
      ]
    })
    .then(project => {
      if (project) res.status(200).json(project);
      else res.status(404).json({ message: "404 Project not found!" })
    })
    .catch(err => res.status(500).json({ message: err.message }))
})

//create new project
router.post('/projects', passport.authenticate('jwt'), (req, res) => {
  Project.create({
    title: req.body.title,
    description: req.body.description,
    owner: req.user._id
  })
    .then(project => {
      User.findByIdAndUpdate(req.user._id, { $push: { projects: project._id } })
        .then(() => {
          Project.findByIdAndUpdate(project._id, {
            $push: { members: project.owner._id },
          })
            .populate({
              path: "owner",
              model: "User",
            })
            .then((updatedProject) => res.json(updatedProject))
            .catch((err) => console.log(err));
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

//update project
router.put(`/projects/:id`, passport.authenticate('jwt'), (req, res) => {
  Project.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(project => res.json(project))
    .catch(err => console.log(err))
})

//add members for project
router.put(`/projects/:id/addmember`, passport.authenticate('jwt'), (req, res) => {
  // console.log('update members for project', req.body._id)
  // console.log(req.body)
  User.findByIdAndUpdate(req.body._id, {
    $addToSet: { projects: req.params.id },
  })
    .then(() =>
      Project.findByIdAndUpdate(
        req.params.id,
        { $addToSet: { members: req.body } },
        { new: true }
      ).populate({
        path: "members",
        model: "User",
      })
    )
    .then((project) => res.json(project))
    .catch((err) => console.log(err));
})

//remove members from project
router.put(`/projects/:id/removemember`, passport.authenticate('jwt'), (req, res) => {
  // console.log('update members for project', req.body._id)
  User.findByIdAndUpdate(req.body._id, { $pull: { projects: req.params.id } })
    .then(() =>
      Project.findByIdAndUpdate(
        req.params.id,
        { $pull: { members: req.body._id } },
        { new: true }
      ).populate({
        path: "members",
        model: "User",
      })
    )
    .then((project) => res.json(project))
    .catch((err) => console.log(err));
})

//delete project, non public issues, and members
router.delete(`/projects/:id`, passport.authenticate('jwt'), (req, res) => {
  Project.findByIdAndDelete(req.params.id)
    .then(project => {
      //go through members, remove the project from their projects
      res.json(project)
    })
    .catch(err => console.log(err))
})

module.exports = router