import { Router } from 'express';
import { getGmailAuthUrl, setGmailCredentials } from '../services/gmailService';
import { getOutlookAuthUrl, setOutlookCredentials } from '../services/outlookService';

const router = Router();

router.get('/auth/gmail', (req, res) => {
  const url = getGmailAuthUrl();
  res.redirect(url);
});

router.get('/auth/gmail/callback', async (req, res) => {
  const code = req.query.code as string;
  const tokens = await setGmailCredentials(code);
  res.json(tokens);
});

router.get('/auth/outlook', async (req, res) => {
  try {
    const url = await getOutlookAuthUrl();
    res.redirect(url);
  } catch (error) {
    console.error('Error getting Outlook auth URL:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/auth/outlook/callback', async (req, res) => {
  const code = req.query.code as string;
  const token = await setOutlookCredentials(code);
  res.json(token);
});

export default router;
