import axios from 'axios'
const localStorage = window.localStorage

const Issue = {
  getById: (id) =>
    axios.get(`/api/issues/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }),
  create: (issue) =>
    axios.post("/api/issues", issue, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }),
  update: (id, issue) =>
    axios.put(`/api/issues/${id}`, issue, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }),
  getAll: () =>
    axios.get("/api/issues", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }),
  delete: (id) =>
    axios.delete(`/api/issues/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }),
  getAllPublic: () =>
    axios.get("/api/issues/public", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }),
};

export default Issue