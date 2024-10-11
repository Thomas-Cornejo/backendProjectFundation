import { Router } from 'express'
import {createUser, getUsers, getUser, filtrarUsuarios, updateUser, deleteUser, usuarioLogin, cambiarContraseña, verificarAdmin} from '../controllers/usuario.controllers.js'

const router = Router()

router.get('/usuarios', getUsers)
router.post('/usuarios', createUser)

router.delete('/usuarios/:id', deleteUser)

router.get('/usuarios/:id', getUser)
router.get("/filtro/:rol", filtrarUsuarios); // Filtrar usuarios
router.get("/:id/admin", verificarAdmin); // Para saber si es admin

router.post("/login", usuarioLogin); //login

router.put('/usuarios/:id', updateUser) //Actualizar usuario
router.put("/cambiar", cambiarContraseña); // Cambia la contraseña
export default router   