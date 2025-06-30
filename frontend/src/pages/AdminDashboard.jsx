import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/AdminDashboard.css';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/users', {
      headers: {
        'User-ID': localStorage.getItem('user_id')
      }
    })
    .then(res => {
      if (Array.isArray(res.data)) setUsers(res.data);
      else setError("Users data is not an array");
    })
    .catch(() => setError("Failed to fetch users"));
  }, []);

  const createLesson = () => {
    if (!title || !category || !content) return alert("All fields are required");

    axios.post('http://localhost:5000/api/admin/lessons', {
      title,
      category,
      content
    }, {
      headers: {
        'User-ID': localStorage.getItem('user_id')
      }
    }).then(() => {
      alert("Lesson created successfully");
      setTitle('');
      setCategory('');
      setContent('');
    }).catch(() => alert("Failed to create lesson"));
  };

  return (
    <div className="dashboard-container">
      <h1>Admin Dashboard</h1>

      <div className="summary-boxes">
        <div className="summary">Users <span>{users.length}</span></div>
        <div className="summary">Lessons <span>--</span></div>
        <div className="summary">Progress <span>--</span></div>
        <div className="summary">Settings <span>--</span></div>
      </div>

      <div className="section">
        <h2>All Users</h2>
        {error && <p className="error">{error}</p>}
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="section">
        <h2>Create Lesson</h2>
        <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <input type="text" placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
        <textarea placeholder="Content" value={content} onChange={e => setContent(e.target.value)} />
        <button className="green-btn" onClick={createLesson}>Create Lesson</button>
      </div>
    </div>
  );
}
