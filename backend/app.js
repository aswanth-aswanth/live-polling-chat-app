import express from 'express';
import authRoutes from './routes/auth.js';
import pollRoutes from './routes/poll.js';
import chatRoutes from './routes/chat.js';
import mongooseConnection from './config/database.js';
import logger from 'morgan';
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

mongooseConnection();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/polls', pollRoutes);
app.use('/api/chat', chatRoutes);

app.use(errorHandler);

export default app;
