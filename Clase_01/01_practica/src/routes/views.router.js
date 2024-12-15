import { Router } from 'express';
import { fork } from 'child_process'
const router = Router();


// 1er endpoint que hace calculo exp
const operacionCompleja = () => {
    let result = 0;
    for (let i = 0; i < 5e9; i++) {
        result += i;
    }
    return result;
};
// router.get('/suma', (req, res) => {
//     res.send(`El resultado de la operacion es: ${operacionCompleja()}`)
// })



// 2do ruta que me indica un contador de visitas
let count = 0;
router.get('/contador-visitas', (req, res) => {
    res.render('index', { count: count++ })
})




// Con child Process
router.get('/suma', (req, res) => {
    const child = fork("./src/forks/operations.js")

    child.send("Iniciar Calculo")

    child.on("message", result => {
        res.send(`Resultado del calculo en fork:, ${result}`)
    })
})


export default router;