import express from 'express';
import config from './config/config.js';
import MongoSingleton from './config/mongodb-singleton.js';
//import Routers
//Performance test:
import performanceRouter from './routers/performance-test.router.js';
import sessionRouter from './routers/sessions.router.js'
import userRouter from './routers/users.router.js';

// **BASE
// import { addLogger } from './config/logger_BASE.js'
import { addLogger } from './config/logger_CUSTOM.js'

const app = express();

//JSON settings:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// **BASE
app.use(addLogger)


//Declare routers:
app.use("/api/performance", performanceRouter);
app.use("/api/session", sessionRouter);
app.use("/api/user", userRouter);

// **BASE
app.get("/logger-test", (req, res) => {

    req.logger.info("Prueba_01 log en endpoint --> /logger-test")


    req.logger.debug("Prueba_02 log en endpoint --> /logger-test")

    res.send("Prueba logger")
})


const SERVER_PORT = config.port;
app.listen(SERVER_PORT, () => {
    console.log("Servidor escuchando por el puerto: " + SERVER_PORT);
});

const mongoInstance = async () => {
    try {
        await MongoSingleton.getInstance();
    } catch (error) {
        console.error(error);
    }
};
mongoInstance();