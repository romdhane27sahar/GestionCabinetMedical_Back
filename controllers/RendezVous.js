import RendezVous from "../models/Rendez-vousModel.js";
import FichePatient from "../models/FichePatientModel.js"
import ProchainRendezVous from "../models/ProchainRendez-vousModel.js"





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

export const createRendezVous = async (req, res) => {
    const { name, lastname, dateRendezVous, heureRendezVous,prochainRendezVousId} = req.body;

    try {
        // Rechercher le patient par nom et prénom
        const fichePatient = await FichePatient.findOne({
            where: {
                name: name,
                lastname: lastname
            }
        });

        // Si le patient n'est pas trouvé, retourner une erreur
        if (!fichePatient) {
            return res.status(404).json({ message: "fiche patient non trouvée" });
        }
       
            await RendezVous.create({
                dateRendezVous: dateRendezVous,
                heureRendezVous: heureRendezVous,
                fichePatientId: fichePatient.id,// Associer l'ID du patient au rendez-vous
                prochainRendezVousId: prochainRendezVousId
              
            });
    
    res.status(201).json({ msg: "rendez-vous ajouté avec succès" });
       
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur d'ajout rendez-vous" });
    }
}


//liste des rendez-vous 
export const getRendezVousWithProchainRv = async (req, res) => {
    // try {
    //     // Récupérer tous les rendez-vous avec leurs prochains rendez-vous associés
    //     const rendezVous = await RendezVous.findAll({
    //         include: [{
    //             model: ProchainRendezVous,
    //             attributes: ['dateProchainRv', 'heureProchainRv']
    //         }]
    //     });

    //     res.status(200).json(rendezVous);
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ message: "Erreur lors de la récupération des rendez-vous" });
    // }
    try {
        const rendezVous = await RendezVous.findAll({
            include: [{
                model: ProchainRendezVous,
                as: 'prochainRendezVou', // alias pour éviter les conflits de noms
                required: false // indique que ce n'est pas une jointure interne, donc même les rendez-vous sans prochain rendez-vous seront inclus
            }]
        });

        res.status(200).json(rendezVous);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Quelque chose s'est mal passé" });
    }

}

//get single RendezVous avec prochains rendezVous by is  
export const getRendezVousWithProchainRvById = async (req, res) => {
    const { id } = req.params;

   
    try {
        const rendezVous = await RendezVous.findOne({
            where: { id },
            include: [{
                model: ProchainRendezVous,
                as: 'prochainRendezVou', // alias pour éviter les conflits de noms
                required: false // indique que ce n'est pas une jointure interne, donc même les rendez-vous sans prochain rendez-vous seront inclus
            }]
        });

        res.status(200).json(rendezVous);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Quelque chose s'est mal passé" });
    }

}


export const updateRendezVous = async (req, res) => {
  const { id } = req.params;
  const nouveauxDetails = req.body;

  try {
    const rendezVous = await RendezVous.findByPk(id, {
      include: [
        {
          model: ProchainRendezVous,
          include: [FichePatient]
        }
      ]
    });

    if (!rendezVous) {
      return res.status(404).json({ message: "Rendez-vous non trouvé" });
    }

    rendezVous.dateRendezVous = nouveauxDetails.dateRendezVous;
    rendezVous.heureRendezVous = nouveauxDetails.heureRendezVous;
    
  

    
    if (rendezVous.prochainRendezVou) {
      rendezVous.prochainRendezVou.dateProchainRv = nouveauxDetails.dateProchainRv;
      rendezVous.prochainRendezVou.heureProchainRv = nouveauxDetails.heureProchainRv;
      await rendezVous.prochainRendezVou.save(); // Ajout de cet appel à save()pour refleter les updates dans la bd


    
      if (rendezVous.prochainRendezVou.fichePatient) {
        rendezVous.prochainRendezVou.fichePatient.name = nouveauxDetails.name;
        rendezVous.prochainRendezVou.fichePatient.lastname = nouveauxDetails.lastname;
        await rendezVous.prochainRendezVou.fichePatient.save(); // Ajout de cet appel à save()pour refleter les updates dans la bd
      }
    }
    

    await rendezVous.save();  
    return res.json(rendezVous);
    
  
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Une erreur est survenue lors de la mise à jour du rendez-vous" });
  }
};


export const deleteRendezVous = async(req, res) =>{
    const rendezVous = await RendezVous.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!rendezVous) return res.status(404).json({msg: "rendezVous non trouvé"});
    try {
        await rendezVous.destroy({
            where:{
                id: rendezVous.id
            }
        });
        res.status(200).json({msg: "RendezVous supprimé avec succès"});
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
