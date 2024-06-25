import { Queue, Worker } from 'bullmq';
import { processEmail } from '../controllers/emailController';
import { listMessages } from '../services/gmailService';

const emailQueue = new Queue('emailQueue');

export const processEmails = async () => {
  const messages = await listMessages();

  for (const message of messages) {
    emailQueue.add('processEmail', { message });
  }
};

new Worker('emailQueue', async job => {
  const { message } = job.data;
  await processEmail(message.snippet); // Assuming snippet contains the email content
});
