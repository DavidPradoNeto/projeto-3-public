import express from "express";
import mongoose, { mongo } from "mongoose";
import routes from "./routes";

class App {
  constructor() {
    this.server = express();
    this.database();
    this.server.use(express.json());
    this.routes();
  }

  database() {
    // mongo pwd: fP1QYczIVD7kLKA7
    mongoose.connect(
      "mongodb+srv://projeto3:fP1QYczIVD7kLKA7@cluster0.wb7n9cs.mongodb.net/?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
