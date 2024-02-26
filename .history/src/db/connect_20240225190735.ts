import mongoose, { ConnectOptions, connect } from "mongoose";

mongoose.set("strictQuery", false);

export const connectToDatabase = (url: string): Promise<typeof mongoose> => {
  const options = {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  } as ConnectOptions;
  return connect(url, options);
};

// return connect(url, options);: Using the connect function from Mongoose to establish a connection to the MongoDB database. The url parameter is the MongoDB connection URL, and the options object specifies additional configuration options for the connection.