const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // This is to parse incoming JSON requests

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'soloparent',
});

// POST route to create a new user (without bcrypt)
app.post('/users', (req, res) => {
  const { email, password, name, role, status } = req.body;

  const sql = 'INSERT INTO users (email, password, name, role, status) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [email, password, name, role, status], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error inserting user into database' });
    }
    return res.status(201).json({ message: 'User created successfully' });
  });
});

// POST route to authenticate login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(sql, [email, password], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    
    if (results.length > 0) {
      return res.status(200).json({ user: results[0] });
    } else {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
  });
});

// POST route to fetch user details based on userId
app.post('/getUserDetails', (req, res) => {
  const { userId } = req.body;

  // Query the database to get the user details
  const sql = 'SELECT * FROM users WHERE id = ?';
  db.query(sql, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching user details' });
    }

    if (results.length > 0) {
      return res.status(200).json(results[0]); // Send the user details back
    } else {
      return res.status(404).json({ error: 'User not found' });
    }
  });
});

// Other routes
app.get('/users', (req, res) => {
  const sql = 'SELECT * FROM users';
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Admin and SuperAdmin routes (unchanged)
app.get('/admin', (req, res) => {
  const sql = 'SELECT * FROM admin';
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get('/superadmin', (req, res) => {
  const sql = 'SELECT * FROM superadmin';
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.listen(8081, () => {
  console.log('Server is listening on port 8081');
});
