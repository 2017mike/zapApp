import axios from 'axios'
const localStorage = window.localStorage

const User = {
  showMine: () => axios.get('/api/users/me', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }),
  login: user => axios.post('/api/users/login', user),
  me: () => axios.get('/api/users/me', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }),
  create: post => axios.post('/api/projects/', post, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }),
  getAll: () => axios.get('/api/users/all', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }),
  getOne: username => axios.get(`/api/users/${username}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }),
  getOneById: id => axios.get(`/api/users/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
}



export default User
