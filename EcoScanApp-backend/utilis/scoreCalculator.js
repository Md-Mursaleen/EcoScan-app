const estimateCarbonScores = require('../utilis/carbonEstimator');

async function scoreCalculator(items) {
    const carbonScores = await estimateCarbonScores(items);

    let totalScore = 0;
    const itemDetails = [];

    items.forEach(item => {
        const score = carbonScores[item] || 5;
        totalScore = totalScore + score;
        itemDetails.push({ name: item, carbonScore: score });
    });

    const ecoPoints = totalScore * 10;

    return { totalScore, ecoPoints, itemDetails };
}

module.exports = scoreCalculator;
