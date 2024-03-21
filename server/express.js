import express from 'express';
import path from 'path';

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';

import devBundle from './devBundle'; // DEV MODE ONLY

import Template from './../template';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';

const CWD = process.cwd();
const app = express();

devBundle.compile(app); // DEV MODE ONLY

app.use('/dist', express.static(path.join(CWD, 'dist')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(cors());

// mount routes
app.use('/', userRoutes);
app.use('/', authRoutes);

app.get('*', (req, res) => {
  res.status(200).send(Template());
});

// Catch unauthorized errors
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({"error" : err.name + ": " + err.message});
  }else if (err) {
    res.status(400).json({"error" : err.name + ": " + err.message});
    console.log(err);
  }
});

export default app;
