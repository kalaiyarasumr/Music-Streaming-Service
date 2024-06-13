const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(bodyParser.json({ limit: '100mb' }));
app.use(cors());

const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
    console.error('MongoDB URI is not defined. Please check your environment variables.');
    process.exit(1);
}

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
    console.error('Connection error:', error);
});
db.once('open', () => {
    console.log('Connected to MongoDB');
});

const DataSchema = new mongoose.Schema({
    file: String,
    description: String,
    title: String,
});

const Data = mongoose.model('Data', DataSchema);

app.get('/get', async (req, res) => {
    try {
        const data = await Data.find();
        res.json(data);
    } catch (err) {
        console.log('Error in fetching data', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/create', async (req, res) => {
    try {
        const { file, description, title } = req.body;
        if (!file || !description || !title) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const existingData = await Data.findOne({ title });
        if (existingData) {
            return res.status(409).json({ error: 'Data with this title already exists' });
        }
        const newData = new Data({ file, description, title });
        await newData.save();
        res.status(201).json('done');
    } catch (error) {
        console.error('Error in creating data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Data.deleteOne({ _id: id });
        if (result.deletedCount > 0) {
            res.json('deleted');
        } else {
            res.status(404).json({ error: 'No data found to delete' });
        }
    } catch (error) {
        console.error('Error in deleting data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { file, description, title } = req.body;
        const result = await Data.updateOne({ _id: id }, { file, description, title });

        if (result.nModified > 0) {
            res.json('updated');
        } else {
            res.status(404).json({ error: 'No data found to update' });
        }
    } catch (error) {
        console.error('Error in updating data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/', (req, res) => {
    res.send('Welcome to the API');
});

app.listen(5000, () => {
    console.log('Server is Running on port 5000');
});
