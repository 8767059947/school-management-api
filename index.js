import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import schoolRoutes from './routes/schoolRoutes.js'


dotenv.config();

const app = express();
app.use(bodyParser.json());


app.use('/api', schoolRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
