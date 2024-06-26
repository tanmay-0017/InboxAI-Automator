# InboxAI Automator

InboxAI Automator is an AI-driven platform designed to automate and optimize large-scale cold email marketing campaigns. It integrates with Google and Outlook to manage email accounts, automatically read and categorize incoming emails, and send context-based automated replies.

## Features

- **OAuth Authentication**: Connect Google and Outlook email accounts using OAuth.
- **Email Reading and Categorization**: Automatically read incoming emails and categorize them as 'Interested', 'Not Interested', or 'More Information'.
- **Automated Replies**: Use OpenAI to generate and send appropriate responses based on email content.
- **Multi-Channel Outreach**: Engage with leads across multiple channels including email.

## Prerequisites

- Node.js
- npm
- Google and Outlook developer accounts for OAuth credentials
- OpenAI API

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/tanmay-0017/InboxAI-Automator.git
   cd InboxAI-Automator


2. **Install dependencies**:

   ```bash
   npm install


3. **Set up environment variables**:

   ```bash
   # Google OAuth credentials
    GMAIL_CLIENT_ID=your_actual_gmail_client_id
    GMAIL_CLIENT_SECRET=your_actual_gmail_client_secret
    GMAIL_REDIRECT_URI=http://localhost:3000/auth/google/callback

    # Outlook OAuth credentials
    OUTLOOK_CLIENT_ID=your_actual_outlook_client_id
    OUTLOOK_CLIENT_SECRET=your_actual_outlook_client_secret
    OUTLOOK_REDIRECT_URI=http://localhost:3000/auth/outlook/callback
    OUTLOOK_TENANT_ID=your_actual_outlook_tenant_id

    # OpenAI API key
    OPENAI_API_KEY=your_actual_openai_api_key

    # Server port
    PORT=3000


## Running the Application

1. **Start the server**:

   ```bash
   npm run dev


2. **Access the application**:

- Open your browser and navigate to [http://localhost:3000/auth/google](http://localhost:3000/auth/google) to authenticate with Google.
- Navigate to [http://localhost:3000/auth/outlook](http://localhost:3000/auth/outlook) to authenticate with Outlook.



3. **Send test emails to the authenticated accounts and verify that the application reads, categorizes, and replies to the emails as expected.**


