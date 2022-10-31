import path from 'path';
import * as dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '../.env') });
import app from './App';
import { logger } from './util/Logger';

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  logger.info(`Server is running at http://localhost:${PORT}`);
});
