const fs = require('fs');
const colors = require('colors')
const crearArchivo = async(base = 8, listar = true, hasta = 10) =>{

    try {
        
        let salida = '';
        let consola = '';

        for(let i=1; i<=hasta; i++){
            salida += `${base} X ${i} = ${base*i}\n`
            consola += `${base} ${colors.red('X')} ${i} = ${base*i}\n`
        }

        if(listar){
            console.log('==========================='.green)
            console.log(`Tabla del: ${base}`.red)
            console.log('==========================='.blue)
            console.log(consola)
        }
            

        // fs.writeFile(`tabla-${base}.txt`,salida, (err)=>{
        //     if(err) throw err;

        //     console.log(`tabla-${base}.txt creada`)
        // })

        fs.writeFileSync(`./salida/tabla-${base}.txt`,salida);

        
        return `tabla-${base}.txt`        
        
    } catch (err) {
        return err;
    }
}

module.exports = {
    crearArchivo
}