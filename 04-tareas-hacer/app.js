// require('colors');
import 'colors'


//const { inquirerMenu, pausa } = require('./helpers/inquirer.js');
import {inquirerMenu,pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoChecklist} from './helpers/inquirer.js';

//const Tarea = require('./models/tarea.js');
import {Tarea} from './models/tarea.js'
import {Tareas} from './models/tareas.js'
import { guardarDB, leerDB } from './helpers/guardarArchivo.js';

const main = async()=>{
    let opt = ''
    const tareas = new Tareas();

    const tareasDB = leerDB();
 
    if(tareasDB){
        //Establecer las tareas
        tareas.cargarTareasFromArray(tareasDB)
    }


    do {
        //Imprimir menú
        opt = await inquirerMenu();

        switch(opt){
            case '1': //Crear nueva tarea 
                const desc = await leerInput('Descripción:');
                tareas.crearTarea(desc)
            break;

            case '2': //listar todas
                tareas.listadoCompleto()
            break;

            case '3': //listar completadas
                tareas.listarPendientesCompletadas(true)
            break;
            
            case '4': //Listar pendientes
                tareas.listarPendientesCompletadas(false)
            break;

            case '5': //Cambiar completado | pendiente
                const ids = await mostrarListadoChecklist(tareas.listadoArr)
                tareas.toggleCompletadas(ids)
            break;


            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr)
                if(id !== '0'){
                    const ok = await confirmar('¿Está seguro?') 
                    if(ok){
                        tareas.borrarTarea(id)
                        console.log('Tarea Borrada exitosamente')
                    }
                }
                
            break;

        }
        
        guardarDB(tareas.listadoArr)
        await pausa();

        //if(opt !== '0') await pausa()
    } while (opt !== '0');

}

main();