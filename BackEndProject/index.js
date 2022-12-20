import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import edurouter from './routes/educationRoutes.js';


dotenv.config();
const mongoString = process.env.CONNECTIONSTRING;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
console.log(error)
})

database.once('connected', () => {
console.log('Database Connected');
})
const app = express();
const PORT = 4000;

app.use(bodyParser.json());
// app.use(express.json());

// app.use('/api', router);
app.use('/api/edu', edurouter);


app.get('/', (req, res) => res.send('Hello from Esther'));


app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));