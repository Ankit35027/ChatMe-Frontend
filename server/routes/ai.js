const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { protect } = require('../middleware/authMiddleware');

router.post('/summarize', protect, async (req, res) => {
    const { title, content } = req.body;

    if (!content) {
        return res.status(400).json({ message: 'Please provide content' });
    }

    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const prompt = `Summarize this note in 3 bullet points:\nTitle: ${title}\nContent: ${content}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;

        res.status(200).json({ summary: response.text() });
    } catch (error) {
        console.error('AI Error:', error.message);
        res.status(500).json({ message: 'Summarization failed' });
    }
});

module.exports = router;
