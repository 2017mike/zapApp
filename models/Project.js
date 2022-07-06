const { model, Schema } = require('mongoose')

//see owner, see members, see issues
const Project = new Schema({
  title: String,
  description: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  members: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  issues: [{
    type: Schema.Types.ObjectId,
    ref: 'Issue'
  }]
})

module.exports = model('Project', Project)