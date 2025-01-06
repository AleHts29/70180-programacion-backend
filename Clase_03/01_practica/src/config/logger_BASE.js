import winston from "winston";


//Creating our logger:
const logger = winston.createLogger({
    //Declare transports:
    transports: [
        new winston.transports.Console({ level: "http" }),
        new winston.transports.File({ filename: './errors.log', level: "warn" })
    ]
})


//Declare y exportar middleware:
export const addLogger = (req, res, next) => {
    req.logger = logger

    // Logica
    req.logger.http(`Method: ${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)

    req.logger.warn(`Method: ${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)


    req.logger.error(`Method: ${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)

    // salimos del middleware
    next()
}




