import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import educationRoute from './routes/educationRoute.js';
import projectRoute from './routes/projectRoute.js';
import skillsRoute from './routes/skillsRoute.js'; 
import userRoute from './routes/userRoute.js';
import emailRoute from './routes/emailRoute.js';


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
const PORT = 4400;

app.use(bodyParser.json());
// app.use(express.json());

// app.use('/api', router);
app.use('/api/edu', educationRoute);
app.use('/api/project', projectRoute);
app.use('/api/skill', skillsRoute);
app.use('/api/user', userRoute);
app.use('/api/email', emailRoute);


// app.get('/', (req, res) => res.send('Hello from Esther'));


app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));