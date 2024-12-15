import { Command } from 'commander';

const program = new Command(); // Crea la instancia de comandos de commander


program
    .option('-d', "Variable de debug", false)
    .option('-p, --port <port>', 'Puerto de escucha', 9090)
    .option('--mode <mode>', 'Modo de trabajo', "develop")
    .requiredOption("-u <user>", "Usuario que va utilizar la aplicaicon", "No se ha declarado ningun user")

program.parse(); // Parsea los commandos y valida si son correctos.


// console.log("Option", program.opts());
// console.log("Mode de operacion", program.opts().mode);
// console.log("Argumentos", program.args);



// 2do Listeneres
process.on('exit', code => {
    console.log("Este codigo se ejecuta antes de salir del process");
    console.log(`Salida con codigo: ${code}`);
})

process.on('uncaughtException', exception => {
    console.log("Este excepcion no fue capturada o controlada");
    console.log(`Excepcion no capturada: ${exception}`);
})



export default program;
