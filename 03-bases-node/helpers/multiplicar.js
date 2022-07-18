const fs = require('fs');
const crearArchivo = async(base, listar) =>{

    try {
        
        let salida = ''

        for(let i=1; i<11; i++){
            salida += `${base} x ${i} = ${base*i}\n`
        }

        if(listar){
            console.log('===========================')
            console.log(`Tabla del: ${base}`)
            console.log('===========================')
            console.log(salida)
        }
            

        // fs.writeFile(`tabla-${base}.txt`,salida, (err)=>{
        //     if(err) throw err;

        //     console.log(`tabla-${base}.txt creada`)
        // })

        fs.writeFileSync(`tabla-${base}.txt`,salida);

        
        return `tabla-${base}.txt`        
        
    } catch (err) {
        return err;
    }
}

module.exports = {
    crearArchivo
}