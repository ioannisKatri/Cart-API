import mongoose from "mongoose";
import {dbCodes, dbErrorCodes} from "../logger/loggingCodes";
import dotEnv from 'dotenv';
import logger from '../logger'

dotEnv.config()

export default new (class MongoDb {

  // TODO throw error if it is missing
  private readonly connectionUrl: string = process.env.CUSTOMCONNSTR_MONGODB_URL ? process.env.CUSTOMCONNSTR_MONGODB_URL :  "";

  async connect() {
    logger.info(dbCodes.INITIALIZING_DB);
    try {
      await mongoose.connect(this.connectionUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      });
      logger.info(dbCodes.SUCCESS_DB_CONNECTION);
      return mongoose;
    } catch (err) {
      logger.info(dbErrorCodes.ERROR_DB_INITIALIZATION);
      return null;
    }
  }
})();
