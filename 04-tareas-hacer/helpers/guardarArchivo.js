//import {writeFile} from 'fs'
import fs from 'fs'

const archivo = './db/data.json'

export const guardarDB =  (data) =>{   
    //fs.writeFile(archivo, JSON.stringify(data))
    fs.writeFileSync(archivo ,JSON.stringify(data) );
}

export const leerDB = () =>{
    if(!fs.existsSync(archivo)){
        return null
    }

    const info  = fs.readFileSync(archivo, {encoding: 'utf-8'})
    const data = JSON.parse(info)
    //console.log(data)

    return data
}