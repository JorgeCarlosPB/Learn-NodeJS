import { Router } from "express";
import { validarCampos } from "../midlewares/validar-campos.js";
import {check} from "express-validator";
import { googleSignIn, login, renovarToken } from "../controllers/auth.controller.js";
import { validarJWT } from '../midlewares/validar-jwt.js'

const router = Router()

//Aquí llamamos a todos los métodos del controlador
router.post('/login',[
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
]
,login)

router.post('/google',[
    check('id_token', 'id_token es necesario').not().isEmpty(),
    validarCampos
]
,googleSignIn)


router.get('/', validarJWT, renovarToken)


export {router}