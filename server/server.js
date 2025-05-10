const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require("path");
const bodyParser = require('body-parser');
const chalk = require('chalk');
require('dotenv').config({ path: './.env' });

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/quotes_db';

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Logging function with colors
const logRequest = (req, res, data = null, error = null) => {
    console.log(chalk.cyan(`[${new Date().toISOString()}]`) + 
                chalk.yellow(` ${req.method}`) + 
                chalk.green(` ${req.originalUrl}`) +
                chalk.magenta(` - IP: ${req.ip}`));
    
    if (req.body && Object.keys(req.body).length) {
        console.log(chalk.blue("Request Body:"), JSON.stringify(req.body, null, 2));
    }
    if (data) {
        console.log(chalk.green("Response Data:"), JSON.stringify(data, null, 2));
    }
    if (error) {
        console.error(chalk.red("Error:"), error);
    }
};

// MongoDB Connection
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(chalk.green('MongoDB connected')))
    .catch(err => console.error(chalk.red('MongoDB connection error:'), err));

// Quote Schema
const quoteSchema = new mongoose.Schema({
    author: { type: String, required: true },
    year: { type: Number, required: true },
    quote: { type: String, required: true }
});

const Quote = mongoose.model('Quote', quoteSchema);

// Routes
// Fetch all quotes
app.get('/api/quotes', async (req, res) => {
    try {
        const quotes = await Quote.find().sort({ date: -1 });
        res.json(quotes);
        logRequest(req, res, quotes);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching quotes', error: err });
        logRequest(req, res, null, err);
    }
});

// Add a new quote
app.post('/api/quotes', async (req, res) => {
    const { author, year, quote } = req.body;
    if (!author || !year || !quote) {
        const errorMsg = { message: 'Author, year, and quote are required' };
        res.status(400).json(errorMsg);
        logRequest(req, res, null, errorMsg);
        return;
    }

    try {
        const newQuote = new Quote({ author, year, quote });
        await newQuote.save();
        res.status(201).json(newQuote);
        logRequest(req, res, newQuote);
    } catch (err) {
        res.status(500).json({ message: 'Error adding quote', error: err });
        logRequest(req, res, null, err);
    }
});

// Serve static frontend files
app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

// Start server
app.listen(PORT, () => console.log(chalk.green(`Server running on http://localhost:${PORT}`)));
