import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import { processEmails } from './scheduler/taskScheduler';

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use('/api', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  processEmails(); // Start processing emails on server start
});
