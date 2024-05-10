import express from "express";
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from "../controllers/Users.js";

import { verifyUser,adminOnly} from "../middleware/AuthUser.js"; /**Les méthodes verifyUser et adminOnly sont des middlewares qui ajoutent des fonctionnalités de vérification de l'utilisateur à certaines routes. Par exemple, verifyUser peut être utilisé pour vérifier si un utilisateur est authentifié avant de lui permettre d'accéder à certaines routes, tandis que adminOnly peut être utilisé pour restreindre l'accès à des utilisateurs ayant un rôle spécifique, comme un administrateur.  */

const router = express.Router();

router.get('/users',adminOnly,verifyUser,getUsers);
router.get('/users/:id', verifyUser,adminOnly,getUserById);
router.post('/users', verifyUser,adminOnly,createUser);
router.patch('/users/:id', verifyUser,adminOnly,updateUser);
router.delete('/users/:id', verifyUser,adminOnly,deleteUser)
export default router;