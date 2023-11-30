const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require("../middleware/fetchuser");
const Notes = require('../models/Notes');

// Route 1 : Fetch all notes: GET "/api/notes/fetchallnotes". login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {

    try {
        //    Find notes by user ID
        let notes = await Notes.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Route 2 : add notes: POST "/api/notes/addnotes". login required
router.post('/addnotes', fetchuser, [
    body('title').isLength({ min: 3 }),
    body('description').isLength({ min: 5 }).withMessage('description length should be more than 5'),
], async (req, res) => {

    const { title, description, tag } = req.body

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    try {
        const notes = new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNotes = await notes.save()

        res.send(savedNotes)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 3: Update an existing Note using: POST "/api/notes/updatenote". Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {

    const { title, description, tag } = req.body;

    // Create a newNote object
    const newNote = {};
    if (title) { newNote.title = title };
    if (description) { newNote.description = description };
    if (tag) { newNote.tag = tag };
    try {
        // Find the note to be updated and update it
        let notes = await Notes.findById(req.params.id);
        if (!notes) { return res.status(404).send("Not Found") }

        // Check if notes.user is defined before accessing toString()
        if (notes.user && notes.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        notes = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ notes });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router;