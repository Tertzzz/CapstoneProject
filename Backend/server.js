const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'soloparent',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Handle SuperAdmin login
app.post('/superadmin-login', async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ 
      success: false,
      error: 'Please provide both email and password' 
    });
  }

  try {
    const query = 'SELECT * FROM superadmin WHERE email = ? AND password = ?';
    db.query(query, [email, password], (err, results) => {
      if (err) {
        console.error('Login error:', err);
        return res.status(500).json({ 
          success: false,
          error: 'Internal server error' 
        });
      }

      if (results.length === 0) {
        return res.status(401).json({ 
          success: false,
          error: 'Invalid SuperAdmin credentials' 
        });
      }

      const superadmin = results[0];
      const userData = {
        id: superadmin.id,
        email: superadmin.email,
        role: 'superadmin',
        timestamp: new Date().getTime()
      };

      res.json({
        success: true,
        user: userData
      });
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Internal server error' 
    });
  }
});

// Regular login endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ 
      success: false,
      error: 'Please provide both email and password' 
    });
  }

  try {
    // First check users table
    db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, userResults) => {
      if (err) {
        console.error('Login error:', err);
        return res.status(500).json({ 
          success: false,
          error: 'Internal server error' 
        });
      }

      if (userResults.length > 0) {
        const user = userResults[0];
        return res.json({
          success: true,
          user: {
            id: user.id,
            email: user.email,
            role: 'user',
            name: user.name,
            timestamp: new Date().getTime()
          }
        });
      }

      // Then check admin table
      db.query('SELECT * FROM admin WHERE email = ? AND password = ?', [email, password], (err, adminResults) => {
        if (err) {
          console.error('Login error:', err);
          return res.status(500).json({ 
            success: false,
            error: 'Internal server error' 
          });
        }

        if (adminResults.length > 0) {
          const admin = adminResults[0];
          return res.json({
            success: true,
            user: {
              id: admin.id,
              email: admin.email,
              role: 'admin',
              name: admin.name,
              timestamp: new Date().getTime()
            }
          });
        }

        // No user found
        res.status(401).json({ 
          success: false,
          error: 'Invalid email or password' 
        });
      });
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Internal server error' 
    });
  }
});

// Get SuperAdmin data
app.get('/superadmin', (req, res) => {
  const query = 'SELECT id, email, role, created_at FROM superadmin';
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching superadmin data:', err);
      return res.status(500).json({ 
        success: false,
        error: 'Error fetching superadmin data' 
      });
    }
    
    res.json({
      success: true,
      data: results
    });
  });
});

// Get users data
app.get('/users', (req, res) => {
  const query = 'SELECT id, email, name, role, status FROM users';
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      return res.status(500).json({ 
        success: false,
        error: 'Error fetching users' 
      });
    }
    
    res.json({
      success: true,
      data: results
    });
  });
});

// Get admin data
app.get('/admin', (req, res) => {
  const query = 'SELECT id, email, role FROM admin';
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching admin data:', err);
      return res.status(500).json({ 
        success: false,
        error: 'Error fetching admin data' 
      });
    }
    
    res.json({
      success: true,
      data: results
    });
  });
});

// Start server
const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
