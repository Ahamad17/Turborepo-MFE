const express = require('express');
const path = require('path');

const app = express();

// Serve Microfrontend 1
app.use(
  '/microfrontend1',
  express.static(path.join(__dirname, '../dist/my-app'))
);

// Serve Microfrontend 2
app.use(
  '/microfrontend2',
  express.static(path.join(__dirname, '../dist/my-app-1'))
);

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the Microfrontends!');
});

app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
  console.log(__dirname);
  console.log('Visit http://localhost:3000/microfrontend1 to see Microfrontend 1.');
  console.log('Visit http://localhost:3000/microfrontend2 to see Microfrontend 2.');
});
