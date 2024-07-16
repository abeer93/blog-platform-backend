import http from 'http';
import app from './app';
import { PORT } from './config/config';

const server = http.createServer(app.callback());

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
