import { connect, connection } from 'mongoose';

const connectDb = (uri) => {
  connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  connection.once('open', () => {
    console.log('Database connected');
  }).on('error', (err) => {
    console.error('Connection error:', err);
  });
};

export default connectDb;