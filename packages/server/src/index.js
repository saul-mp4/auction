import 'dotenv/config';
import { createServer } from 'node:http';

import { socketManager } from './socket.js';
import { expressManager } from './express.js';

//init
const app = expressManager.init();
const server = createServer(app);
socketManager.init(server);

server.listen(3000, () => {
    console.log('Server started');
});
