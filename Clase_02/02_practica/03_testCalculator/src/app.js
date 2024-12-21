import express from 'express'
import calculatorRouter from './routes/calculator.router.js'

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Router
app.use('/api/calculator', calculatorRouter)


app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);

})