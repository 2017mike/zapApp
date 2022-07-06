require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { join } = require('path')
const passport = require('passport')
const { Strategy: LocalStrategy } = require('passport-local')
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')

const app = express()
const { User } = require('./models')
app.use(cors())
app.use(express.static(join(__dirname, 'client', 'build')))
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET
}, ({ id }, cb) => User.findById(id)
  .populate({
    path: 'projects',
    model: 'Project',
    populate: {
      path: 'owner',
      model: 'User',
    }
  })  
  .populate({
    path: 'issues',
    mode: 'Issue',
    populate: [{
      path: 'author',
      model: 'User',
      select: 'name'
    }, {
        path: 'replies',
        model: 'Reply',
        populate: {
          path: 'author',
          model: 'User',
        }
      },
    {
      path: 'pid',
      model: 'Project',
      select: 'title'
    }]
  })
  .then(user => cb(null, user))
  .catch(err => cb(err))))

app.use(require('./routes'))

app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'client', 'build', 'index.html'))
})

require('./db')
  .then(() => app.listen(process.env.PORT || 3001))
  .catch(err => console.log(err))
