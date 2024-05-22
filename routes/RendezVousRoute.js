import express from "express";
import { 
    createRendezVous,
    getRendezVousWithProchainRv,
    updateRendezVous,
    deleteRendezVous
//     getFicheById,
   
//     updateFiche,
//   deleteFiche
  
} from "../controllers/RendezVous.js";

import { verifyUser} from "../middleware/AuthUser.js"; /**Les méthodes verifyUser et adminOnly sont des middlewares qui ajoutent des fonctionnalités de vérification de l'utilisateur à certaines routes. Par exemple, verifyUser peut être utilisé pour vérifier si un utilisateur est authentifié avant de lui permettre d'accéder à certaines routes, tandis que adminOnly peut être utilisé pour restreindre l'accès à des utilisateurs ayant un rôle spécifique, comme un administrateur.  */

const router = express.Router();


router.post('/rendezVous',verifyUser, createRendezVous);


router.get('/rendezVousList',verifyUser,getRendezVousWithProchainRv);
// router.get('/fichePatient/:id', verifyUser,getFicheById);
router.patch('/rendezVousUpdate/:id', verifyUser,updateRendezVous);
router.delete('/rendezVous/:id', verifyUser,deleteRendezVous)
export default router;