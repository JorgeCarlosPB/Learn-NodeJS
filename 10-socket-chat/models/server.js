import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import fileUpload from 'express-fileupload'
import { createServer } from "http";
import { Server } from "socket.io";

import {router as auth} from '../routes/auth.js'
import {router as user} from '../routes/user.js'
import {router as categoria} from '../routes/categorias.js'
import {router as buscar} from '../routes/buscar.js'
import {router as producto} from '../routes/productos.js'
import {router as uploads} from '../routes/uploads.js'

import {dbConnection} from '../database/config.js'
import { socketController } from '../sockets/controller.js';


class Servidor{
    constructor(){   
        this.app = express()
        this.port = process.env.PORT
        this.server = createServer(this.app)
        this.io =new Server(this.server)

        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            categorias: '/api/categorias',
            productos:'/api/productos',
            usuarios: '/api/usuarios',
            uploads: '/api/uploads'
        }

        //Conectar a la base de datos
        this.conectarDB()

        //Middlewares
        this.middlewares()

        //rutas de mi aplicación
        this.routes()

        //sockets
        this.sockets()
    }
    async conectarDB(){
        await dbConnection()
    }

    middlewares(){
        //CORS
        this.app.use(cors())

        //Lectura y parseo de body
        this.app.use(express.json())

        //directorio publico
        this.app.use(express.static('public'))

        //Carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    routes(){
        this.app.use(this.paths.auth, auth)
        this.app.use(this.paths.buscar, buscar)
        this.app.use(this.paths.categorias, categoria)
        this.app.use(this.paths.productos, producto)
        this.app.use(this.paths.usuarios, user)
        this.app.use(this.paths.uploads, uploads)
    }
    sockets(){
        this.io.on('connection',(socket)=> socketController(socket, this.io))

    }

    listen(){        
        this.server.listen(this.port,()=>{
            console.log('servidor corriendo en el puerto', this.port)
        })
    }
 }

 export{
    Servidor 
 }