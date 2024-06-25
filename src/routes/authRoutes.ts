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

router.get('/auth/outlook', (req, res) => {
  const url = getOutlookAuthUrl();
  res.redirect(url);
});

router.get('/auth/outlook/callback', async (req, res) => {
  const code = req.query.code as string;
  const token = await setOutlookCredentials(code);
  res.json(token);
});

export default router;
