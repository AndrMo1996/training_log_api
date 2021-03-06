import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';

import daysRoutes from './routers/days.js'
import userRoutes from './routers/user.js'

const app = express();

app.use(bodyParser.json( {limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded( {limit: "30mb", extended: true }));
app.use(cors());

app.use('/days', daysRoutes);
app.use('/user', userRoutes);

const DB_CONNECTION_URL = "mongodb+srv://AdminAndrMo:XR2W9MhfcAVGWnC@traininglogapp.gz0it.mongodb.net/TrainingLogDB?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5001;

mongoose.connect(DB_CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch((error) => console.log(error.message));



