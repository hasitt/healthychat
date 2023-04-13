2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const getGoogleAuthUrl = () => {
  const scopes = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
  ];

  const url = client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: scopes,
  });

  return url;
};

const getGoogleUser = async (code) => {
  const { tokens } = await client.getToken(code);

  client.setCredentials(tokens);

  const { data } = await client.request({
    url: 'https://www.googleapis.com/oauth2/v1/userinfo',
  });

  return data;
};

module.exports = { getGoogleAuthUrl, getGoogleUser };