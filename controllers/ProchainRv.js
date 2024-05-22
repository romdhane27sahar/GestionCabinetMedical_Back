import ProchainRendezVous from "../models/ProchainRendez-vousModel.js";
import FichePatient from "../models/FichePatientModel.js"
//import RendezVous from "../models/Rendez-vousModel.js"

import argon2 from "argon2"

//liste de tous les prochains rendez-vous 
export const getProchainsRv = async (req, res) => {
    try {
        const response = await ProchainRendezVous.findAll({
            attributes: ['uuid','dateProchainRv','heureProchainRv']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

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

 

export const updateProchainRv = async(req, res) =>{
    const prochainRv = await ProchainRendezVous.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!prochainRv) return res.status(404).json({msg: "Prochain Rendez-vous non trouvé"});
    // const {name, email, password, confPassword, role,lastname,address,telephone} = req.body;

    const {dateProchainRv, heureProchainRv} = req.body;
   
    try {
        await ProchainRendezVous.update({
            dateProchainRv: dateProchainRv,
            heureProchainRv: heureProchainRv,
        },{
            where:{
                id: prochainRv.id
            }
        });
        res.status(200).json({msg: "Prochain rendez-vous à jour avec succès"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

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
