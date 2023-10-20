const express = require('express');
const multer = require('multer');
const dataMeme = require('./routes/routeMeme');
const axios = require('axios');
const app = express();
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
app.use(bodyParser.json());
const connectDB = require('./config/db');
app.use('/meme', dataMeme);
const PORT = 5000;
const users = [];
app.post('/register', async (req, res) => {
    try {
      const { username, password } = req.body;
      if (users.find((user) => user.username === username)) {
        return res.status(400).json({ message: 'User already exists' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      users.push({ username, password: hashedPassword });
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Registration failed' });
    }
  });
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find((user) => user.username === username);
  
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
  
    if (passwordMatch) {
      const token = jwt.sign({ username }, 'your_secret_key');
      res.json({ message: 'Login successful', token });
    } else {
      res.status(401).json({ message: 'Authentication failed' });
    }
  });
const storage = multer.memoryStorage();
const upload = multer({ storage });
app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const apiKey = 'e3ebe65d99f70152cdf61f561a145ebd';
        const formData = new FormData()
        formData.append('key', apiKey)
        const image = req.file.buffer.toString('base64');
        formData.append('image', image)

        const response = await axios.post('https://api.imgbb.com/1/upload', formData);

        if (response.data.status === 200) {
            const imageUrl = response.data.data.url;
            console.log('Image uploaded successfully:', imageUrl);
            res.json({ imageUrl });
        } else {
            console.error('ImgBB API Error:', response.data.status_txt);
            res.status(500).json({ error: 'batoul--Error uploading the file' });
        }
    } catch (error) {
        console.error('Internal Server Error:', error);
        res.status(500).json({ error: 'Error uploading the file' });
    }
});

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
});