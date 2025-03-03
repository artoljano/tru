import fs from 'fs/promises';
import path from 'path';
import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/gmail.send'];
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

// Load saved credentials if they exist
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH, 'utf8');
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

// Save credentials to token.json
async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH, 'utf8');
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload, 'utf8');
}

// Authorize the client and get tokens
async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }

  const { client_id, client_secret, redirect_uris } = JSON.parse(await fs.readFile(CREDENTIALS_PATH, 'utf8')).installed;
  const oauth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });

  console.log('Authorize this app by visiting this url:', authUrl);

  return new Promise((resolve, reject) => {
    process.stdin.once('data', async (code) => {
      code = code.toString().trim();
      try {
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);
        await saveCredentials(oauth2Client);
        resolve(oauth2Client);
      } catch (err) {
        reject(err);
      }
    });
  });
}

// Send Review Email
async function sendReviewEmail({ name, email, episode, rating, review }) {
  try {
    const auth = await authorize();
    const gmail = google.gmail({ version: 'v1', auth });

    const message = `From: "${name}" <${email}>
` +
      `To: artoljano0@gmail.com
` +
      `Subject: New Podcast Review
` +
      `Content-Type: text/plain; charset="UTF-8"

` +
      `Name: ${name}
Email: ${email}
Episode: ${episode}
Rating: ${rating}
Review: ${review}`;

    const encodedMessage = Buffer.from(message)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    await gmail.users.messages.send({
      userId: 'me',
      requestBody: { raw: encodedMessage },
    });

    console.log('Review email sent successfully!');
  } catch (err) {
    console.error('Failed to send review email:', err);
  }
}

// Send Suggestion Email
async function sendSuggestionMail({ name, email, suggestedGuest, guestBackground, whyGuest }) {
  try {
    const auth = await authorize();
    const gmail = google.gmail({ version: 'v1', auth });

    const message = `From: "${name}" <${email}>
` +
      `To: artoljano0@gmail.com
` +
      `Subject: Podcast Guest Suggestion
` +
      `Content-Type: text/plain; charset="UTF-8"

` +
      `Name: ${name}
Email: ${email}
Suggested Guest: ${suggestedGuest}
Guest Background: ${guestBackground}
Why this Guest: ${whyGuest}`;

    const encodedMessage = Buffer.from(message)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    await gmail.users.messages.send({
      userId: 'me',
      requestBody: { raw: encodedMessage },
    });

    console.log('Suggestion email sent successfully!');
  } catch (err) {
    console.error('Failed to send suggestion email:', err);
  }
}

export default { sendReviewEmail, sendSuggestionMail };
