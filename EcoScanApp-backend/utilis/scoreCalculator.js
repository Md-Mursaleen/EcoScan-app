const estimateCarbonScores = require('../utilis/carbonEstimator');
const fallbackScores = require('../data/fallbackScores');

async function scoreCalculator(items) {
    let carbonScores = {};

    try {
        carbonScores = await estimateCarbonScores(items);
    } catch (error) {
        console.error('Failed to estimate carbon scores using OpenAI. Falling back to static scores.');
        console.error(error.message || error);
    }

    let totalScore = 0;
    const itemDetails = [];

    items.forEach(item => {
        const score = carbonScores[item] || fallbackScores[item] || 5;
        totalScore = totalScore + score;
        itemDetails.push({ name: item, carbonScore: score });
    });

    const ecoPoints = totalScore * 10;

    return { totalScore, ecoPoints, itemDetails };
}

module.exports = scoreCalculator;
