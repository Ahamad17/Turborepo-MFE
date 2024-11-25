import express from 'express';
import next from 'next';
import dotenv from 'dotenv';
import path from 'path';
import { createProxyMiddleware } from 'http-proxy-middleware';

const nodeEnv = process?.env?.NODE_ENV || '';
const isLocal = nodeEnv !== 'production';

if (isLocal) {
  dotenv.config({ path: path.join(__dirname, '../.env.local') });
}

const overviewApp = next({
  dev: isLocal,
  dir: path.join(__dirname, isLocal ? '../../overview' : '../overview'),
  hostname: 'localhost',
  port: parseInt(process.env.PORT || '3000', 10)
});

const overviewAppHandler = overviewApp.getRequestHandler();

async function startServer() {
  try {
    await overviewApp.prepare();

    const app = express();
    const PORT = <number>(process.env.PORT || 3000);

    if (isLocal) {
      app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        next();
      });

      app.use(
        '/_next/webpack-hmr',
        createProxyMiddleware({
          target: `http://localhost:${PORT}`,
          ws: true,
          changeOrigin: true,
        })
      );
    }

    app.all('*', (req, res) => {
      return overviewAppHandler(req, res);
    });

    if (isLocal) {
      app.listen(PORT, () => {
        console.log(`> Server running at http://localhost:${PORT}`);
        console.log(`> Environment: ${process.env.NODE_ENV}`);
      });
    } else {
      app.listen(PORT, 'localhost', () => {
        console.info(`Server started in Production mode. Ready on localhost:${PORT}`);
      });
    }
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
}

startServer();
