import express from 'express';
import config from './config/config.js';
import { addLogger } from './config/logger.js';
import performanceRouter from './routers/performance-test.router.js'

import cluster from 'cluster'
import { cpus } from 'os';


console.log("soy el proceso primario?: ", cluster.isPrimary);

// if (cluster.isPrimary) {
//     console.log(`Process primary ${process.pid} is running`);

//     cluster.fork(); // se crea un solo worker

// } else {
//     console.log("Soy en el worker");
// }


// 2da parte
// if (cluster.isPrimary) {
//     console.log(`Process primary ${process.pid} is running`);
//     const numeroCpus = cpus().length
//     console.log(`Numero de cpus: ${numeroCpus}`);


//     for (var i = 0; i < numeroCpus - 1; ++i) {
//         cluster.fork(); // se crea un solo worker
//     }


// } else {
//     console.log("Soy en el worker");
// }


// 3ro 
if (cluster.isPrimary) {
    console.log(`Process primary ${process.pid} is running`);
    const numeroCpus = cpus().length
    console.log(`Numero de cpus: ${numeroCpus}`);


    for (var i = 0; i < numeroCpus - 1; ++i) {
        cluster.fork(); // se crea un solo worker
    }


    // Listener para manejar la muerte de un worker
    cluster.on('exit', (worker) => {
        console.log(`El worker ${worker.process.pid} died`);
        // creamon uno nuevo
        cluster.fork();
    })


} else {
    const app = express();

    console.log("Este es un proceso Fork! Soy un worker!!");
    console.log(`Soy un proceso worker con el id: ${process.pid}`);



    app.use(addLogger);


    // declaramos enpoints

    app.get('/', (req, res) => {
        res.send(`Worker ${process.pid} respondió a la petición GET en /`)
    })

    app.use('/api/performance', performanceRouter)


    app.listen(config.port, () => {
        console.log(`Worker ${process.pid} escuchando en el puerto ${config.port}`)
    })

}