const express = require('express');
const router = express.Router();
const generateRewards = require('../utilis/generateRewards');
const fallbackRewards = require('../data/rewards');

router.get('/', async (req, res) => {
    const points = parseInt(req.query.points, 10);

    if (isNaN(points)) {
        return res.status(400).json({ error: 'Invalid or missing points parameter' });
    }

    try {
        const rewards = await generateRewards(points);
        if (rewards.length > 0) {
            return res.json({ rewards });
        } else {
            // fallback filter from static rewards
            const eligible = fallbackRewards.filter(rewards => rewards.requiredPoints <= points);
            return res.json({ rewards: eligible });
        }
    } catch (err) {
        console.error('Reward generation failed:', err);
        return res.status(500).json({ error: 'Failed to generate rewards' });
    }
});

module.exports = router;
