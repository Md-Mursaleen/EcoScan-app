const scoresEstimator = require('./scoresEstimator');
const fallbackScores = require('../data/carbonScores');
const fallbackEcoPoints = require('../data/ecoPoints');

async function scoresCalculator(items) {
    let estimatedCarbonAndEcoPoints = {};

    try {
        estimatedCarbonAndEcoPoints = await scoresEstimator(items);
    } catch (error) {
        console.error('Failed to estimate carbon scores and eco points using OpenAI. Falling back to static values.');
        console.error(error.message || error);
    }

    let totalCarbonScore = 0;
    let totalEcoPoints = 0;
    const itemDetails = [];

    items.forEach(item => {
        const estimatedItem = estimatedCarbonAndEcoPoints[item] || {};

        const carbonScore = estimatedItem.carbonScore || fallbackScores[item] || 5;
        const ecoPoints = estimatedItem.ecoPoints || fallbackEcoPoints[item] || (carbonScore * 10);

        totalCarbonScore = totalCarbonScore + carbonScore;
        totalEcoPoints = totalEcoPoints + ecoPoints;
        itemDetails.push({ name: item, carbonScore, ecoPoints });
    });

    return { itemDetails, totalCarbonScore, totalEcoPoints };
}

module.exports = scoresCalculator;
