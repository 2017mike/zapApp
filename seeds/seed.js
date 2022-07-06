require('dotenv').config();
const mongoose = require('mongoose');
const db = require('../models');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/zap_db', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

(async function () {
  try {

    const UserSeed = [
      {
        name: 'John Doe',
        username: 'johndoe123',
        email: 'johndoe12345@gmail.com',
        projects: [mongoose.Types.ObjectId('60f33d96aabe8e8458c39031')],
        issues: [],
        score: 0
      }
    ];

    await db.User.deleteMany({})
    await db.Project.deleteMany({})
    await db.Issue.deleteMany({})

    const users = await db.User.collection.insertMany(UserSeed)
    // console.log(users)

    const ProjectSeed = [
      {
        title: 'Apollo',
        description: 'Apollo is an app that will change your life in all the good ways. Using Node.JS, Express and React',
        owner: users.ops[0]._id,
        members: [],
        issues: []
      }
    ]
    const projects = await db.Project.collection.insertMany(ProjectSeed)
    await db.User.findOneAndUpdate({ _id: users.ops[0]._id, },
      { $push: { projects: projects.ops[0]._id } })

    
    const IssueSeed = [
      title: 'Why do I get “Reducer […] returned undefined during initialization” despite providing initialState to createStore()?',
      body: "I have a constructor function which registers an event handler: However, I'm not able to access the data property of the created object inside the callback. It looks like this does not refer to the object that was created but to an other one.I also tried to use an object method instead of an anonymous function: but it exhibits the same problems. How can I access the correct object?",
      status: 'Open',
      priority: 'High',
      author: users.ops[0]._id,
      replies: []
    ]
    const issues = await db.Issue.collection.insertMany(IssueSeed)
    
    const CommunityIssueSeed = [
      title: 'Why do I get “Reducer […] returned undefined during initialization” despite providing initialState to createStore()?',
      body: "I have a constructor function which registers an event handler: However, I'm not able to access the data property of the created object inside the callback. It looks like this does not refer to the object that was created but to an other one.I also tried to use an object method instead of an anonymous function: but it exhibits the same problems. How can I access the correct object?",
      status: 'Open',
      author: users.ops[0]._id,
      replies: [],
      issue: issues.op[0]._id
    ]
    const communityissues = await db.CommunityIssue.collection.insertMany(CommunityIssueSeed)
    
    const ReplySeed = [
      text: 'String',
      
    ]


    await db.CommunityIssue.findOneAndUpdate({ _id: communityissues.ops[0]._id, },
      { $push: { replies: replies.ops[0]._id } })


  } catch (err) {
    console.log(err)
  }
})()



// const IssueSeed = [
//   {

//   }
// ]





// db.Project.deleteMany({})
//   .then(() => db.Project.collection.insertMany(ProjectSeed))
//   .then((data) => {
//     console.log(data.result.n + ' records inserted!');
//     process.exit(0);
//   })
//   .catch((err) => {
//     console.error(err);
//     process.exit(1);
//   });
