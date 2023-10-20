const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://baatoullbatoull:qv7964fHCh33Pg2Y@cluster0.92cml40.mongodb.net/assesment', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const connectToDatabase = async function connectToDatabase() {
    try {
        await mongoose.connect('mongodb+srv://baatoullbatoull:qv7964fHCh33Pg2Y@cluster0.92cml40.mongodb.net/assesment', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}


module.exports = connectToDatabase;