import express from "express";
import { 
    createProchainRv,
    updateProchainRv
//     getFiches,
//     getFicheById,
   
//     updateFiche,
//   deleteFiche
  
} from "../controllers/ProchainRv.js";

import { verifyUser} from "../middleware/AuthUser.js"; /**Les méthodes verifyUser et adminOnly sont des middlewares qui ajoutent des fonctionnalités de vérification de l'utilisateur à certaines routes. Par exemple, verifyUser peut être utilisé pour vérifier si un utilisateur est authentifié avant de lui permettre d'accéder à certaines routes, tandis que adminOnly peut être utilisé pour restreindre l'accès à des utilisateurs ayant un rôle spécifique, comme un administrateur.  */

const router = express.Router();


router.post('/prochainRv',verifyUser, createProchainRv);

// router.get('/fichePatient',verifyUser,getFiches);
// router.get('/fichePatient/:id', verifyUser,getFicheById);
router.patch('/prochainRv/:id', verifyUser,updateProchainRv);
// router.delete('/fichePatient/:id', verifyUser,deleteFiche)
export default router;