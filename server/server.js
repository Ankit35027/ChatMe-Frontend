const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const authRoutes = require('./routes/auth');
const noteRoutes = require('./routes/notes');
const aiRoutes = require('./routes/ai');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/ai', aiRoutes);

app.get('/', (req, res) => {
    res.send('Server is running');
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
