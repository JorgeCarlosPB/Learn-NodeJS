import jwt from 'jsonwebtoken'
import { Usuario } from '../models/usuario.js'

const generarJWT = (uid = '') =>{

    return new Promise((resolve, reject) =>{
        const payload = {uid}

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY,{
            expiresIn:'4h'
        }, (err, token)=>{
            if(err){
                console.log(err)
                reject('No se pudo general el token')
            }else{
                resolve(token)
            }
        })
    })

}

const comprobarJWT = async(token = '')=>{
    try {
        if(token.length< 10){
            return null
        }

        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
        const usuario = await Usuario.findById(uid)
        if(usuario){
            if(usuario.estado){
                return usuario
            } else{
                return null
            }
        }else{
            return null
        }
 
    } catch (error) {
        return null
        
    }
}

export{
    generarJWT,
    comprobarJWT
}