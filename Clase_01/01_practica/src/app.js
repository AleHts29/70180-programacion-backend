import express from 'express';
import program from './process.js';
// import dotenv from 'dotenv'
import config from './config/config.js';
import viewsRoutes from './routes/views.router.js'
import handlebars from 'express-handlebars';
import __dirname from './utils.js';



// dotenv.config()

const app = express();
const PORT = config.port;

//JSON settings:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));




// console.log("adminName", config.adminName);


app.get('/ping', (req, res) => {
    res.send('pong');
})


app.use("/", viewsRoutes)



// console.log("Option", program.opts());
// console.log("Argumentos", program.args);




app.listen(PORT, () => {
    console.log("Server listening on port: ", PORT);

    // ❯ nodemon src/app.js --mode prod -p 3000
    // console.log(process.argv.slice(2)); // -> [ '--mode', 'prod', '-p', '3000' ]


    // process.exit(5);


    // consola();


    // console.log('LLamando lista de numeros');
    // listNumbers(1, 2, 3, "aaaa", true)

})




const listNumbers = (...numbers) => {
    let invalidData = false;
    let dataType = new Array()

    numbers.forEach(element => {
        console.log(element);

        if (typeof (element) !== "number") {
            invalidData = true;
        }
        dataType.push(typeof (element))
    })

    if (invalidData) {
        console.error("Invalid parameters");
        console.log(dataType);
        process.exit(-4);
    }
}