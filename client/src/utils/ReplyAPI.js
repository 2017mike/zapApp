import axios from 'axios'
const localStorage = window.localStorage

const Reply = {
  create: reply => axios.post('/api/replies', reply, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }),
  delete: id => axios.delete(`/api/replies/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }),
  update: (id, reply) => axios.put(`/api/replies/${id}`, reply, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
}

export default Reply