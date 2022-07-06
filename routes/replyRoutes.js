const router = require('express').Router()
const { Issue, Reply, Project, User } = require('../models')
const passport = require('passport')

//make update, create, and delete no need for individual reply grabbing

//create reply and push it to the issue replies
router.post('/replies', passport.authenticate('jwt'), (req, res) => {
  // console.log('req.body', req.body)
  // console.log(req.body.text)
  Reply.create({
    text: req.body.text,
    author: req.user._id
    //post id (pid) expected here
  })
    .then(reply => {
      User.findById(req.user._id)
      .then(author => {
        Issue.findByIdAndUpdate(req.body.pid, { $push: { replies: reply._id } })
        .then(() => {
          // console.log('this is reply', reply)
          reply.author = author
          res.json(reply)
        })
        .catch(err => console.log(err))
        })
      })
    .catch(err => console.log(err))
})

router.put(`/replies/:id`, passport.authenticate('jwt'), (req, res) => {
  Reply.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(project => res.json(project))
    .catch(err => console.log(err))
})

router.delete(`/replies/:id`, passport.authenticate('jwt'), (req, res) => {
  Reply.findByIdAndDelete(req.params.id)
    .then(reply => res.json(reply))
    .catch(err => console.log(err))
})

module.exports = router