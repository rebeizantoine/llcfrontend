require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT;
require('./config/db');
const userRoutes = require('./routes/userRoute');
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});
app.use(bodyParser.json());
app.use('/user', userRoutes);
app.use(cors(corsOptions));
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
/*https://www.db4free.net/phpMyAdmin/index.php?route=/database/structure&db=ourllcc*/