const express = require('express');
const cors = require('cors');
require('dotenv').config();

const analysis = require('./routes/analysis');
const rewards = require('./routes/rewards');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/analysis', analysis);
app.use('/rewards', rewards);

app.get('/', (req, res) => {
    res.send('EcoScan Backend is running!');
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is listening on port ${PORT}`);
});
