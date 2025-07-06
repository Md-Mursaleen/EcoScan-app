const express = require('express');
const multer = require('multer');
const router = express.Router();
const openAIClassifier = require('../utilis/openAIClassifier');
const scoreCalculator = require('../utilis/carbonAndEcoPointsCalculator');
const mockClassifier = require('../utilis/mockClassifier');

const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST /analyze - Accept image, detect items, return carbon scores and eco-reward points 
router.post('/', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'Image is required' });
        }

        const base64Image = req.file.buffer.toString('base64');
        let detectedItems;
        try {
            detectedItems = await openAIClassifier(base64Image);
        } catch (error) {
            console.error('openAIClassifier failed. Falling back to mockClassifier.');
            console.error(error.message || error);
            // Fallback to mock classifier if OpenAI fails
            detectedItems = mockClassifier(base64Image);
        }

        // Calculate carbon score and eco-reward points
        const { totalCarbonScore, totalEcoPoints, itemDetails } = await scoreCalculator(detectedItems);

        return res.json({ items: itemDetails, totalCarbonScore, totalEcoPoints });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
