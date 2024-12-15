import dotenv from 'dotenv'
import program from "../process.js";
import path from 'path';



// const environment = "production";


const environment = program.opts().mode;

dotenv.config({
    path: environment === "develop" ? "./src/config/.env.development" : "./src/config/.env.production"
}
);




export default {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    adminName: process.env.ADMIN_NAME,
    adminPassword: process.env.ADMIN_PASSWORD
}