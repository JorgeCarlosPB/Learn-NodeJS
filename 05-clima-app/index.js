import 'dotenv/config' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
//import express from 'express'

import { inquirerMenu, leerInput, listarLugares, pausa } from "./helpers/inquirer.js"
import { Busquedas } from "./models/busquedas.js";


const main = async()=>{
    const busquedas = new Busquedas()
    let opt;

    do {
        opt = await inquirerMenu()

        switch(opt){
            case 1: //Buscar una ciudad
                //Mostrar mensaje
                const termino = await leerInput('Ciudad:');

                //Buscar lugares
                const lugares = await busquedas.ciudad(termino)

                //Seleccionar el lugar 
                const id = await listarLugares(lugares)
                if (id === '0') continue;

                const lugarSel = lugares.find(l => l.id === id);
                busquedas.agregarHistorial(lugarSel.nombre)
                //clima
                const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng)
                
                //Mostrar resultados
                console.log('\nInformación de la ciudad\n'.green)
                console.log('ciudad:', lugarSel.nombre.green);
                console.log('Lat:', lugarSel.lat);
                console.log('Lng:',lugarSel.lng);
                console.log('Temperatura:', clima.temp);
                console.log('Mínima:',clima.min);
                console.log('Máxima:',clima.max);
                console.log('¿Cómo está el clima?:',clima.desc.green);
            break;

            case 2: //Mostrar el historial
                busquedas.historialCapitalizado.forEach((lugar, i)=>{
                    const idx = `${i+1}.`.green
                    console.log(`${idx} ${lugar}`)
                })
            break;
        }

        await pausa();
        
    } while (opt !== 0);

    
}

main()