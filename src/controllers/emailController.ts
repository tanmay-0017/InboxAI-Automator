import { analyzeEmailContent, generateReply } from '../utils/openaiUtils';
import { listMessages, sendMessage } from '../services/gmailService';

export const processEmail = async (email: string) => {
  const category = await analyzeEmailContent(email);
  const reply = await generateReply(category);
  await sendMessage(reply);
};
