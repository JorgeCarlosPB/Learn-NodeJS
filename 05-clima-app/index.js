import { inquirerMenu, leerInput, pausa } from "./helpers/inquirer.js"
import { Busquedas } from "./models/busquedas.js";


const main = async()=>{
    const busquedas = new Busquedas()
    let opt;

    do {
        opt = await inquirerMenu()

        switch(opt){
            case 1: //Buscar una ciudad
                const lugar = await leerInput('Ciudad:');
                console.log(lugar);

                console.log('\nInformación de la ciudad\n'.green)
                console.log('ciudad:',);
                console.log('Lat:',);
                console.log('Lng:',);
                console.log('Temperatura:',);
                console.log('Mínima:',);
                console.log('Máxima:',);
            break;

            case 2: //Mostrar el historial
                console.log('Esta es la segunda opción')
            break;
        }

        await pausa();
        
    } while (opt !== 0);

    
}

main()