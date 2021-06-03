import { connect } from 'mongoose';

import { MONGO_URI } from '../config/env';

connect(MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: true,
}).then(() => console.log('> DB connection sucessful'));
