import { configDotenv } from 'dotenv';
configDotenv();

import app from './app.js';
import { createServer } from 'http';
import { setupSocket } from './config/socket.js';

const port = process.env.PORT || 4000;
const server = createServer(app);

setupSocket(server);

server.listen(port, () => console.log(`Server listening on port ${port}`));
