import express from 'express';
import 'dotenv/config';

import pino from 'pino-http';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(cors());

app.use(express.json());

app.use(
  pino({
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss',
        ignore: 'pid,hostname',
        messageFormat:
          '{req.method} {req.url} {res.statusCode} - {responseTime}ms',
        hideObject: true,
      },
    },
  }),
);

app.get('/notes', (req, res) => {
  res.status(200).json({ message: 'Retrieved all notes' });
});
app.get('/notes/:noteId', (req, res) => {
  const { noteId } = req.params;
  res.status(200).json({ message: `Retrieved note with ID: ${noteId}` });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use('/test-error', () => {
  throw new Error('Simulated server error');
});

app.use((err, req, res) => {
  res.status(500).json({ message: `${err.message}` });
});
