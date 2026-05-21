import express from 'express';
import 'dotenv/config';

import cors from 'cors';
import { connectMongoDB } from './db/connectMongoDB';
import { errorHandler } from './middleware/errorHandler';
import { notFoundHandler } from './middleware/notFoundHandler';
import { logger } from './middleware/logger';
import routes from './routes/notesRoutes';
const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(cors());

app.use(express.json());

app.use(logger);

app.use(routes);

app.use(notFoundHandler);

app.use('/test-error', () => {
  throw new Error('Simulated server error');
});

app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
