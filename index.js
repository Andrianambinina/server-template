const { ParseServer } = require('parse-server');
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

const app = express();
const port = 1337;

const init = async () => {
  await dotenv.config({ path: path.join(__dirname, '.env.local') });

  const serverURL = 'http://localhost:' + port;

  const DATABASE_URI = process.env.DATABASE_URI;
  const MASTER_KEY = process.env.MASTER_KEY;

  const server = new ParseServer({
    databaseURI: DATABASE_URI,
    cloud: path.resolve(__dirname, './cloud/main'),
    appId: 'server-template',
    masterKey: MASTER_KEY,
    serverURL: serverURL + '/parse',
  });

  await server.start();

  app.use('/parse', server.app);

  app.listen(1337, function () {
    console.log('Server is running on port 1337.');
  });
};

init();
