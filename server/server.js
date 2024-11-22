const express = require('express');
const path = require('path');

const app = express();

const environment = process.env.NODE_ENV || 'development';
console.log(`Running in ${environment} mode`);

// Serve Microfrontend 1
app.use(
  '/microfrontend1',
  express.static(path.join(__dirname, '../dist/my-app'))
);

app.use(
  '/_next/static',
  express.static(path.join(__dirname, '../dist/my-app/_next/static'))
);

app.use(
  '/_next/static',
  express.static(path.join(__dirname, '../dist/my-app-1/_next/static'))
);

// Serve Microfrontend 2
app.use(
  '/microfrontend2',
  express.static(path.join(__dirname, '../dist/my-app-1'))
);

// Default route
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Microfrontends</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 20px;
          background-color: #f4f4f9;
          color: #333;
          text-align: center;
        }
        h1 {
          color: #555;
        }
        .environment {
          padding: 10px;
          margin: 20px 0;
          border: 2px solid #333;
          border-radius: 5px;
          background-color: #fff;
        }
        a {
          display: inline-block;
          margin: 10px;
          padding: 10px 20px;
          color: #fff;
          background-color: #007bff;
          text-decoration: none;
          border-radius: 5px;
        }
        a:hover {
          background-color: #0056b3;
        }
      </style>
    </head>
    <body>
      <h1>Welcome to the Microfrontends!</h1>
      <div class="environment">
        <p><strong>Current Environment:</strong> ${environment}</p>
      </div>
      <p>Choose a microfrontend to view:</p>
      <div>
        <a href="/microfrontend1">Microfrontend 1</a>
        <a href="/microfrontend2">Microfrontend 2</a>
      </div>
    </body>
    </html>
  `);
});

app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
  console.log(__dirname);
  console.log('Visit http://localhost:3000/microfrontend1 to see Microfrontend 1.');
  console.log('Visit http://localhost:3000/microfrontend2 to see Microfrontend 2.');
});
