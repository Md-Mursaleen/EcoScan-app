const { OpenAI } = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function generateRewards(points) {
    const prompt = `
                    You are an assistant for a sustainability app.

                    Generate 3-5 personalized eco-rewards a user can redeem using ${points} eco-points. 
                    Each reward should be unique, eco-conscious, and cost less than or equal to the user's points. 
                    Format your response as a JSON array with each object having:

                        - title (string)
                        - requiredPoints (number)
                        - description (string)

                    Be creative but relevant. Example: discounts at eco-stores, digital badges, sustainable product giveaways, donations, etc.
                   `;

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 400,
        });

        const content = response.choices[0].message.content.trim();

        try {
            const parsed = JSON.parse(content);
            return Array.isArray(parsed) ? parsed : [];
        } catch (err) {
            console.error('Failed to parse GPT reward response:', content);
            return [];
        }
    } catch (err) {
        console.error('OpenAI error (reward generator):', err);
        return [];
    }
}

module.exports = generateRewards;
