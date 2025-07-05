const { OpenAI } = require('openai');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function gptClassifier(base64Image) {
    const prompt = `
                    You are an expert in fashion and sustainability.
                    Look at the image and list all visible clothing items. 
                    Only mention major items like T-shirt, jeans, jacket, dress, or shoes. 
                    Return the answer as a simple array of item names, e.g., ["T-shirt", "Jeans"]
                   `;

    const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
            {
                role: 'user',
                content: [
                    { type: 'text', text: prompt },
                    {
                        type: 'image_url',
                        image_url: {
                            url: `data:image/jpeg;base64,${base64Image}`,
                        },
                    },
                ],
            },
        ],
        max_tokens: 200,
    });

    const text = response.choices[0].message.content.trim();

    try {
        const parsedText = JSON.parse(text);
        return Array.isArray(parsedText) ? parsedText : [];
    } catch {
        // fallback if response isn't valid JSON
        return text.split(/[,;]/).map(item => item.trim());
    }
}

module.exports = gptClassifier;
