const { model, Schema } = require('mongoose')

//be able to access a users projects and see issues they posted
const User = new Schema({
  name: {
    type: String,
    trim: true,
    required: 'Name is required',
  },
  username: {
    type: String,
    trim: true,
    unique: true,
    required: 'Username is required',
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: 'Email is required',
    match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Invalid Email'],
  },
  projects: [{
    type: Schema.Types.ObjectId,
    ref: 'Project'
  }],
  issues: [{
    type: Schema.Types.ObjectId,
    ref: 'Issue'
  }],
  score: {
    type: Number,
    default: 0
  }
})

User.plugin(require('passport-local-mongoose'))

module.exports = model('User', User)
