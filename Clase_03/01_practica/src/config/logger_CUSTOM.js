import winston, { transports } from "winston";
import config from "./config.js";

//Custom logger options:
// *orange no existe, estos son los disponibles: Font foreground colors: `black`, `red`, `green`, `yellow`, `blue`, `magenta`,`cyan`, `white`, `gray`,

const customLevelsOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        http: 3,
        info: 4,
        debug: 5
    },
    colors: {
        fatal: 'red',
        error: 'orange',
        warning: 'yellow',
        info: 'blue',
        debug: 'white'
    }
}
winston.addColors(customLevelsOptions.colors)


//Custom Logger:
const devLogger = winston.createLogger({
    // Levels: 
    levels: customLevelsOptions.levels,
    transports: [
        new winston.transports.Console(
            {
                level: "info",
                format: winston.format.combine(
                    winston.format.colorize({ colors: customLevelsOptions.colors }),
                    winston.format.simple()
                )
            }
        ),
        new winston.transports.File(
            {
                filename: './errors.log',
                level: "warning",
                format: winston.format.simple()
            })
    ]
})






//Creating our logger:
const prodLogger = winston.createLogger({
    //Declare transports:
    levels: customLevelsOptions.levels,
    transports: [
        new winston.transports.Console({ level: "http" }),
        new winston.transports.File({ filename: './errors.log', level: "warning" })
    ]
})


//Declare y export el middleware:
export const addLogger = (req, res, next) => {

    if (config.environment === "production") {
        req.logger = prodLogger

        req.logger.warning("Prueba de log level warn!");
        req.logger.http(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)

    } else {
        req.logger = devLogger

        req.logger.warning("Prueba de log level warn!");
        req.logger.http(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
    }

    // salimos del middleware
    next()
}