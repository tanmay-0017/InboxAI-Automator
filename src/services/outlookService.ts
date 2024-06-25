import { ConfidentialClientApplication } from '@azure/msal-node';
import dotenv from 'dotenv';

dotenv.config();

const msalConfig = {
  auth: {
    clientId: process.env.OUTLOOK_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${process.env.OUTLOOK_TENANT_ID}`,
    clientSecret: process.env.OUTLOOK_CLIENT_SECRET
  }
};

const cca = new ConfidentialClientApplication(msalConfig);

export const getOutlookAuthUrl = () => {
  const authCodeUrlParameters = {
    scopes: ['https://graph.microsoft.com/.default'],
    redirectUri: process.env.OUTLOOK_REDIRECT_URI
  };

  return cca.getAuthCodeUrl(authCodeUrlParameters);
};

export const setOutlookCredentials = async (code: string) => {
  const tokenRequest = {
    code: code,
    scopes: ['https://graph.microsoft.com/.default'],
    redirectUri: process.env.OUTLOOK_REDIRECT_URI
  };

  const response = await cca.acquireTokenByCode(tokenRequest);
  return response.accessToken;
};

// Add functions for reading and sending emails using Microsoft Graph API
