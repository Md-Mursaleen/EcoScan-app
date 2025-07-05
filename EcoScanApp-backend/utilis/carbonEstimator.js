const { OpenAI } = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function estimateCarbonScores(items) {
    const prompt = `
                    You are a sustainability expert. Estimate the carbon footprint (in kg of CO₂) required to manufacture the following clothing items. 
                    Respond with a JSON object where keys are the item names and values are numeric scores (rounded to the nearest integer).
                    
                    Items: ${JSON.stringify(items)}
                   `;

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 300,
        });

        const content = response.choices[0].message.content.trim();

        try {
            const parsed = JSON.parse(content);
            return parsed;
        } catch {
            // fallback if not valid JSON
            console.error("GPT response not valid JSON:", content);
            return {};
        }
    } catch (err) {
        console.error('OpenAI error (carbon estimator):', err);
        return {};
    }
}

module.exports = estimateCarbonScores;
