const { model, Schema } = require('mongoose')

//see author, see replies
const Issue = new Schema({
  title: String,
  body: {
    type: Object,
    required: true
  },
  isPublic: Boolean,
  status: String,
  priority: String,
  pid: {
    type: Schema.Types.ObjectId,
    ref: 'Project'
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  replies: [{
    type: Schema.Types.ObjectId,
    ref: 'Reply'
  }]
}, { timestamps: true, minimize: false })

module.exports = model('Issue', Issue)