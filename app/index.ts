import 'express-async-errors';
import mongoDb from "./configurations/databases/mongoDb";
import app from './app';

require('dotenv').config();

const startApp = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined');
    }

    // const result = await mongoDb.connect();
    // if (result === null) {
    //     throw new Error("Failed to connect to DB")
    // }
    app.listen(8000, () => console.log("App listening on 8000 port"));

}

startApp().catch((err) => {
    console.log(err.message);
    console.log("App failed to start")
});

