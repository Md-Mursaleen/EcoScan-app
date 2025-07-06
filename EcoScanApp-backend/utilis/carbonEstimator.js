const { OpenAI } = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function estimateCarbonAndEcoPoints(items) {
    const prompt = `
                    You are a sustainability expert for a carbon impact app. Estimate the **carbon footprint** (in kg CO₂) **and eco-reward points** required to manufacture the following clothing items. 
                    Respond in **JSON format** like this:
                        {
                            "T-shirt": { "carbonScore": 5, "ecoPoints": 50 },
                            "Jacket": { "carbonScore": 20, "ecoPoints": 200 }
                        }
                    Make sure values are numeric (rounded to the nearest integer). Use your knowledge of sustainability impact and consumer incentives.
                    
                    Items: ${JSON.stringify(items)}
                   `;

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 300,
        });

        const content = response.choices[0].message.content.trim();

        try {
            const parsedContent = JSON.parse(content);
            return parsedContent;
        } catch {
            // fallback if not valid JSON
            console.error("GPT response is not valid JSON:", content);
            return {};
        }
    } catch (error) {
        console.error('OpenAI API error (carbon estimator):', error);
        return {};
    }
}

module.exports = estimateCarbonAndEcoPoints;
