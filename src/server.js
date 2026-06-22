import express from 'express';
import 'dotenv/config';
import { errors } from 'celebrate';

import cors from 'cors';
import { connectMongoDB } from './db/connectMongoDB.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { logger } from './middleware/logger.js';
import routes from './routes/notesRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';

import cookieParser from 'cookie-parser';
const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(cors());
app.use(cookieParser());

app.use(express.json());

app.use(logger);

app.use(routes);
app.use(authRoutes);
app.use(userRoutes);

app.use(notFoundHandler);
app.use(errors);

app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
