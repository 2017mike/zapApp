const router = require('express').Router()
const { Issue, Reply, Project, User } = require('../models')
const passport = require('passport')

// get all issues that has isPublic is true
router.get('/issues/public', (req, res) => {
  Project.find({})
    .populate('author')
    .then(issues => res.json(issues))
    .catch(err => console.log(err))
})

//get issue by id
router.get('/issues/:id', passport.authenticate('jwt'), (req, res) => {
  Issue.findById(req.params.id, {new: true})
    .populate('author')
    .populate({
      path: 'replies',
      model: 'Reply',
      populate: {
        path: 'author',
        model: 'User'
      }
    })
    .then(issue => res.json(issue))
    .catch(err => console.log(err))
})

//get all issues
router.get('/issues', passport.authenticate('jwt'), (req, res) => {
  Issue.find({})
    .populate('author')
    .populate({
      path: 'replies',
      model: 'Reply',
      populate: {
        path: 'author',
        model: 'User'
      }
    })
    .then(issues => res.json(issues))
    .catch(err => console.log(err))
})

//create new issue (needs project id)
router.post('/issues', passport.authenticate('jwt'), (req, res) => {
  // console.log(req.body.body)
  Issue.create({
    title: req.body.title,
    body: req.body.body,
    isPublic: req.body.isPublic,
    status: req.body.status,
    priority: req.body.priority,
    pid: req.body.pid,
    //expected pid here (req.body.pid)
    author: req.user._id
  })
    .then(issue => {
      // note: this method only works to add to the poster too because
      // atm, by default, the project owner is also a Member
      Project.findByIdAndUpdate(req.body.pid, { $push: { issues: issue._id } })
        .then(data => {
          // console.log("data.members", data.members);
          let members = data.members;
          for (const member of members) {
            User.findByIdAndUpdate(member, { $push: { issues: issue._id } })
              .then(() => {
                // console.log("Issue added to each member of the project!");
                // const promise1 = new Promise((resolve, reject) => {
                // resolve('Success!');
                // });

                // promise1.then((value) => {
                //  Issue.findById({_id: issue._id})
                //    .populate("author")
                //    .populate({
                //      path: "replies",
                //      model: "Reply",
                //      populate: {
                //        path: "author",
                //        model: "User",
                //      },
                //    })
                //    .then((newIssue) => res.json(newIssue));
                //   });
              })
              .catch((err) => console.log(err));
          }
           Issue.findById({_id: issue._id})
             .populate("author")
             .populate({
               path: "replies",
               model: "Reply",
               populate: {
                 path: "author",
                 model: "User",
               },
             })
             .then((newIssue) => res.json(newIssue));

            });
        })
        .catch(err => console.log(err))
    })
//     .catch(err => console.log(err))
// })

//update issue
router.put(`/issues/:id`, passport.authenticate('jwt'), (req, res) => {
  Issue.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .populate("author pid")
    .then((project) => res.json(project))
    .catch((err) => console.log(err));
})

router.delete(`/issues/:id`, passport.authenticate('jwt'), (req, res) => {
  Issue.findByIdAndDelete(req.params.id)
    .then(issue => res.json(issue))
    .catch(err => console.log(err))
})


module.exports = router