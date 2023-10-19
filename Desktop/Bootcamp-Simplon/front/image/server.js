const express = require('express');
const multer = require('multer');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
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
