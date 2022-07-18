
const {crearArchivo} = require('./helpers/multiplicar')
const argv = require('yargs')
            .option('b',{
                alias: 'base',
                type: 'number',
                demandOption: true,
            })
            .option('l',{
                alias: 'listar',
                type: 'boolean',
                default: false,
            })
            .check((argv, options)=>{
                if(isNaN(argv.b)){
                    throw 'La base tiene que ser un número'
                }
                return true;
            })
            .argv;
            

// option('l')
// listar
// boolean
// default


console.clear();


crearArchivo(argv.b, argv.l)
    .then(nombreArchivo => console.log(nombreArchivo, 'Creado'))
    .catch(err => console.log(err));
console.log('base: yargs', argv.base);


// const [ , , arg3 = 'base=5'] = process.argv;
// const [, base = 5] = arg3.split('=')
// console.log(base);

//const base = 9;

