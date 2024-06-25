import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

const oauth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  process.env.GMAIL_REDIRECT_URI
);

export const getGmailAuthUrl = () => {
  const scopes = ['https://www.googleapis.com/auth/gmail.readonly', 'https://www.googleapis.com/auth/gmail.send'];
  return oauth2Client.generateAuthUrl({ access_type: 'offline', scope: scopes });
};

export const setGmailCredentials = async (code: string) => {
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  return tokens;
};

export const listMessages = async () => {
  const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
  const res = await gmail.users.messages.list({ userId: 'me' });
  return res.data.messages || [];
};

export const sendMessage = async (message: string) => {
  const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
  const email = `To: recipient@example.com\nSubject: Response\n\n${message}`;
  const base64EncodedEmail = Buffer.from(email).toString('base64').replace(/\+/g, '-').replace(/\//g, '_');
  await gmail.users.messages.send({
    userId: 'me',
    requestBody: {
      raw: base64EncodedEmail,
    },
  });
};
