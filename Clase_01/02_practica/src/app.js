import express from 'express';
import config from './config/config.js';
//Clase de test:
import suma from './suma.js';
//import Routers
import usersRouter from './routes/users.router.js'

const app = express();

//JSON settings:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const SERVER_PORT = config.port;

app.get('/ping', (req, res) => {
    res.send('pong');
})


//Declare routers:
app.use("/api/users", usersRouter);



app.listen(SERVER_PORT, () => {
    console.log("listening on port " + SERVER_PORT);


    // Escenarios
    let testPasados = 0;
    const testTotales = 4;


    //1. La función debe devolver null si algún parámetro no es numérico.
    testPasados = escenario1(testPasados);

    //2. La función debe devolver 0 si no se pasó ningún parámetro
    testPasados = escenario2(testPasados);

    //3. La función debe poder realizar la suma correctamente. 
    testPasados = escenario3(testPasados);

    //4. La función debe poder hacer la suma con cualquier cantidad de números.
    testPasados = escenario4(testPasados);


    console.log(`TestTotales a ejecutar: ${testTotales}, pasaron: ${testPasados}`);


})



// Definicion de los Escenarios
const escenario1 = (testPasados) => {
    // Given
    const num1 = "1";
    const num2 = 2;

    // Then
    let result = suma(num1, num2)
    // console.log(result);


    // Assert
    if (result === null) {
        console.log("Test 1: pasado!\n");
        testPasados++
    } else {
        console.error(`Test 1: No pasado, se recibió ${typeof result}, pero se esperaba null.`);
    }

    return testPasados;
}

const escenario2 = (testPasados) => {
    // Given
    // const num1 = "1";
    // const num2 = 2;

    // Then
    let result = suma()
    // console.log(result);


    // Assert
    if (result === 0) {
        console.log("Test 2: pasado!\n");
        testPasados++
    } else {
        console.error(`Test 2: No pasado, se recibió ${result}, pero se esperaba 0.`);
    }

    return testPasados;
}

const escenario3 = (testPasados) => {
    // Given
    const num1 = 1;
    const num2 = 2;

    // Then
    let result = suma(num1, num2)
    // console.log(result);


    // Assert
    let expected = num1 + num2
    if (result === expected) {
        console.log("Test 3: pasado!\n");
        testPasados++
    } else {
        console.error(`Test 3: No pasado, se recibió ${result}, pero se esperaba ${expected}.`);
    }

    return testPasados;
}

const escenario4 = (testPasados) => {
    // Given
    const numueros = [1, 2, 3, 4, 5]

    // Then
    let result = suma(...numueros)
    // console.log(result);


    // Assert
    let expected = 15
    if (result === expected) {
        console.log("Test 4: pasado!\n");
        testPasados++
    } else {
        console.error(`Test 4: No pasado, se recibió ${result}, pero se esperaba ${expected}.`);
    }

    return testPasados;
}