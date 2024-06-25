import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export const analyzeEmailContent = async (content: string) => {
  const openaiApiKey = process.env.OPENAI_API_KEY;
  const prompt = `Categorize the following email content into: Interested, Not Interested, More Information.\n\nEmail: ${content}\n\nCategory:`;

  const response = await axios.post('https://api.openai.com/v1/engines/davinci/completions', {
    prompt: prompt,
    max_tokens: 10,
    temperature: 0.7
  }, {
    headers: {
      'Authorization': `Bearer ${openaiApiKey}`
    }
  });

  return response.data.choices[0].text.trim();
};

export const generateReply = async (category: string) => {
  let prompt = '';

  switch (category) {
    case 'Interested':
      prompt = 'Generate a response to schedule a demo call.';
      break;
    case 'Not Interested':
      prompt = 'Generate a polite thank you response.';
      break;
    case 'More Information':
      prompt = 'Generate a response to provide more information and schedule a call.';
      break;
  }

  const response = await axios.post('https://api.openai.com/v1/engines/davinci/completions', {
    prompt: prompt,
    max_tokens: 50,
    temperature: 0.7
  }, {
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    }
  });

  return response.data.choices[0].text.trim();
};
