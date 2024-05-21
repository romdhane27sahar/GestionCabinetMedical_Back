import ProchainRendezVous from "../models/ProchainRendez-vousModel.js";
import FichePatient from "../models/FichePatientModel.js"
//import RendezVous from "../models/Rendez-vousModel.js"

import argon2 from "argon2"

// export const getFiches = async (req, res) => {
//     try {
//         const response = await FichePatient.findAll({
//             attributes: ['uuid','name', 'lastname','telephone','email', 'address', 'sexe','dateNaiss', 'numSecuriteSoc']
//         });
//         res.status(200).json(response);
//     } catch (error) {
//         res.status(500).json({ msg: error.message });
//     }
// }

// export const getFicheById = async (req, res) => {
//     try {
//         const response = await FichePatient.findOne({
//             attributes: ['uuid','lastname','telephone','email', 'address', 'sexe','dateNaiss', 'numSecuriteSoc'],
//             where: {
//                 uuid: req.params.id
//             }
//         });

//         res.status(200).json(response);

//     } catch (error) {
//         res.status(500).json({ msg: error.message });
//     }
// }


export const createProchainRv = async (req, res) => {
    const { fichePatientId, dateProchainRv, heureProchainRv } = req.body;
    try {
        const fichePatient = await FichePatient.findByPk(fichePatientId);
        console.log(fichePatient)
        if (!fichePatient) {
            return res.status(404).json({ message: "Fiche patient non trouvée" });
        }

        await ProchainRendezVous.create({
            dateProchainRv: dateProchainRv,
            heureProchainRv: heureProchainRv,
            fichePatientId: fichePatient.id,
           

            
        });

        res.status(201).json({ msg: "Prochain rendez-vous ajouté avec succès" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Quelque chose s'est mal passé" });
    }
}

 

// export const updateFiche = async(req, res) =>{
//     const fiche = await FichePatient.findOne({
//         where: {
//             uuid: req.params.id
//         }
//     });
//     if(!fiche) return res.status(404).json({msg: "Fiche non trouvée"});
//     // const {name, email, password, confPassword, role,lastname,address,telephone} = req.body;

//     const {name, lastname,telephone,email, address, sexe,dateNaiss, numSecuriteSoc} = req.body;
   
//     try {
//         await FichePatient.update({
//             name: name,
//             lastname:lastname, 
//             telephone:telephone,
//             email:email,
//             address:address,
//             sexe:sexe,
//             dateNaiss:dateNaiss,
//             numSecuriteSoc:numSecuriteSoc
//         },{
//             where:{
//                 id: fiche.id
//             }
//         });
//         res.status(200).json({msg: "Fiche mise à jour avec succès"});
//     } catch (error) {
//         res.status(400).json({msg: error.message});
//     }
// }

// export const deleteFiche = async(req, res) =>{
//     const fiche = await FichePatient.findOne({
//         where: {
//             uuid: req.params.id
//         }
//     });
//     if(!fiche) return res.status(404).json({msg: "Fiche non trouvée"});
//     try {
//         await fiche.destroy({
//             where:{
//                 id: fiche.id
//             }
//         });
//         res.status(200).json({msg: "Fiche supprimée avec succès"});
//     } catch (error) {
//         res.status(400).json({msg: error.message});
//     }
// }
