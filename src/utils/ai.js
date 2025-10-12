const API_KEY = process.env.REACT_APP_GEMINI_API_KEY || 'YOUR_API_KEY_HERE';

export const generateAIResponse = async (prompt) => {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error('Failed to generate response. Check your API key.');
    }

    const data = await response.json();
    return data.candidates[0]?.content?.parts[0]?.text || 'No response generated.';
  } catch (err) {
    throw err;
  }
};
