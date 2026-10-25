import express from 'express';

const app = express();

app.use(express.json());

// Health check endpoint, used by the scheduled workflow.
app.get('/api/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.get('/', (_req, res) => {
  res.json({ message: 'GitHub Actions basics API' });
});

export default app;
