
const express = require('express');
const router = express.Router();
const Entry = require('../models/Entry');

// GET all entries
router.get('/', async (req, res) => {
  try {
    const entries = await Entry.find().sort({ createdAt: -1 });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching entries', error: error.message });
  }
});

// POST a new entry
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    // Create new entry
    const newEntry = new Entry({
      name,
      email,
      message
    });
    
    // Save to database
    const savedEntry = await newEntry.save();
    
    res.status(201).json({
      message: 'Entry created successfully',
      entry: savedEntry
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating entry', error: error.message });
  }
});

// GET a single entry by ID
router.get('/:id', async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.id);
    if (!entry) {
      return res.status(404).json({ message: 'Entry not found' });
    }
    res.json(entry);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching entry', error: error.message });
  }
});

module.exports = router;
