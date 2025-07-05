const express = require('express');
const multer = require('multer');
const router = express.Router();
const gptClassifier = require('../utilis/gptClassifier');
const scoreCalculator = require('../utilis/scoreCalculator');

// Set up multer for image upload (in-memory)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST /analyze - Accept image, detect items, return carbon scores + rewards
router.post('/', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'Image is required' });
        }

        // Simulate clothing item detection
        const base64Image = req.file.buffer.toString('base64');
        const detectedItems = await gptClassifier(base64Image);

        // Calculate carbon score and eco-reward points
        const { totalScore, ecoPoints, itemDetails } = await scoreCalculator(detectedItems);

        return res.json({
            items: itemDetails,
            totalScore,
            ecoPoints,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
