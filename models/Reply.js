const { model, Schema} = require('mongoose')

//just see the author of the reply
const Reply = new Schema({
  text: {
    type: Object,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
},
  {
    timestamps: true, minimize: false
  }
)

module.exports = model('Reply', Reply)