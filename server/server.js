const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/quotes_db';

// Middleware
app.use(cors());
app.use(bodyParser.json());

//serve static frontend files
app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});


// MongoDB Connection
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Quote Schema
const quoteSchema = new mongoose.Schema({
    author: { type: String, required: true },
    year: { type: Number, required: true }, // Store only the year
    quote: { type: String, required: true }
  });

const Quote = mongoose.model('Quote', quoteSchema);

// Routes
// Fetch all quotes
app.get('/api/quotes', async (req, res) => {
  try {
    const quotes = await Quote.find().sort({ date: -1 });
    res.json(quotes);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching quotes', error: err });
  }
});

// Add a new quote
app.post('/api/quotes', async (req, res) => {
    const { author, year, quote } = req.body;
    if (!author || !year || !quote) {
      return res.status(400).json({ message: 'Author, year, and quote are required' });
    }
  
    try {
      const newQuote = new Quote({ author, year, quote });
      await newQuote.save();
      res.status(201).json(newQuote);
    } catch (err) {
      res.status(500).json({ message: 'Error adding quote', error: err });
    }
  });

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));