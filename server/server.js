import config from './../config/config';
import app from './express';
import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${config.mongoUri}`)
});

app.listen(config.port, function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('Server started on port %s.', config.port);
});
