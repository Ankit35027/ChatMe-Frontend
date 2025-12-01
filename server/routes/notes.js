const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, async (req, res) => {
    try {
        const { search, filter, sort, page = 1, limit = 6 } = req.query;
        const query = { userId: req.user.id };

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { content: { $regex: search, $options: 'i' } },
            ];
        }

        if (filter === 'pinned') {
            query.isPinned = true;
        }

        let sortOption = { createdAt: -1 };
        if (sort === 'oldest') {
            sortOption = { createdAt: 1 };
        } else if (sort === 'az') {
            sortOption = { title: 1 };
        } else if (sort === 'za') {
            sortOption = { title: -1 };
        }

        const skip = (page - 1) * limit;

        const notes = await Note.find(query)
            .sort(sortOption)
            .skip(parseInt(skip))
            .limit(parseInt(limit));

        const total = await Note.countDocuments(query);

        res.status(200).json({
            notes,
            currentPage: parseInt(page),
            totalPages: Math.ceil(total / limit),
            totalNotes: total,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', protect, async (req, res) => {
    try {
        if (!req.body.title || !req.body.content) {
            return res.status(400).json({ message: 'Please add a title and content' });
        }

        const note = await Note.create({
            userId: req.user.id,
            title: req.body.title,
            content: req.body.content,
            tags: req.body.tags || [],
            isPinned: req.body.isPinned || false,
        });

        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', protect, async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        if (!req.user) {
            return res.status(401).json({ message: 'User not found' });
        }

        if (note.userId.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json(updatedNote);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', protect, async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        if (!req.user) {
            return res.status(401).json({ message: 'User not found' });
        }

        if (note.userId.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        await note.deleteOne();

        res.status(200).json({ id: req.params.id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/', protect, async (req, res) => {
    try {
        await Note.deleteMany({ userId: req.user.id });
        res.status(200).json({ message: 'All notes deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
