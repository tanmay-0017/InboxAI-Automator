import { ConfidentialClientApplication, Configuration, AuthorizationUrlRequest, AuthorizationCodeRequest } from '@azure/msal-node';
import dotenv from 'dotenv';
import { Client } from '@microsoft/microsoft-graph-client';
import { ClientSecretCredential } from '@azure/identity';
import 'isomorphic-fetch';

dotenv.config();

const msalConfig: Configuration = {
  auth: {
    clientId: process.env.OUTLOOK_CLIENT_ID!,
    authority: `https://login.microsoftonline.com/${process.env.OUTLOOK_TENANT_ID}`,
    clientSecret: process.env.OUTLOOK_CLIENT_SECRET
  }
};

const cca = new ConfidentialClientApplication(msalConfig);

export const getOutlookAuthUrl = async () => {
  const authCodeUrlParameters: AuthorizationUrlRequest = {
    scopes: ['https://graph.microsoft.com/.default'],
    redirectUri: process.env.OUTLOOK_REDIRECT_URI!
  };

  return await cca.getAuthCodeUrl(authCodeUrlParameters);
};

export const setOutlookCredentials = async (code: string) => {
  const tokenRequest: AuthorizationCodeRequest = {
    code: code,
    scopes: ['https://graph.microsoft.com/.default'],
    redirectUri: process.env.OUTLOOK_REDIRECT_URI!
  };

  const response = await cca.acquireTokenByCode(tokenRequest);
  return response.accessToken;
};

// Initialize Microsoft Graph Client
const credential = new ClientSecretCredential(
  process.env.OUTLOOK_TENANT_ID!,
  process.env.OUTLOOK_CLIENT_ID!,
  process.env.OUTLOOK_CLIENT_SECRET!
);

const graphClient = Client.initWithMiddleware({
  authProvider: {
    getAccessToken: async () => {
      const tokenResponse = await credential.getToken(['https://graph.microsoft.com/.default']);
      if (!tokenResponse || !tokenResponse.token) {
        throw new Error('Failed to acquire token');
      }
      return tokenResponse.token;
    }
  }
});

export const listMessages = async () => {
  const res = await graphClient
    .api('/me/messages')
    .top(10)
    .select('subject,from,bodyPreview')
    .orderby('receivedDateTime DESC')
    .get();
  return res.value;
};

export const sendMessage = async (subject: string, content: string, to: string) => {
  const message = {
    subject: subject,
    body: {
      contentType: 'Text',
      content: content
    },
    toRecipients: [
      {
        emailAddress: {
          address: to
        }
      }
    ]
  };

  await graphClient.api('/me/sendMail').post({ message });
};
