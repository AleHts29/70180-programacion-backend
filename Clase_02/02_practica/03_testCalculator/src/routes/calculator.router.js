import { Router } from 'express';
import calculator from "publicarmodulo-npm-calculator";


const router = Router();

// APIs

router.post('/sum', (req, res) => {
    const { num1, num2 } = req.body;
    const result = calculator.sum(num1, num2);
    res.json({ result: result });
});


router.post('/subtract', (req, res) => {
    const { num1, num2 } = req.body;
    const result = calculator.subtract(num1, num2);
    res.json({ result: result });
})


router.post('/multiply', (req, res) => {
    const { num1, num2 } = req.body;
    const result = calculator.multiply(num1, num2);
    res.json({ result: result });
})


router.post('/divide', (req, res) => {
    try {
        const { num1, num2 } = req.body;
        const result = calculator.divide(num1, num2);
        res.json({ result: result });
    } catch (error) {
        res.status(400).send({ error: error.message })
    }

})


export default router;