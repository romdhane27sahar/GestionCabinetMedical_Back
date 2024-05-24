import FichePatient from "../models/FichePatientModel.js"
import argon2 from "argon2"

export const getFiches = async (req, res) => {
    try {
        const response = await FichePatient.findAll({
            attributes: ['uuid','name', 'lastname','telephone','email', 'address', 'sexe','dateNaiss', 'numSecuriteSoc']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getFicheById = async (req, res) => {
    try {
        const response = await FichePatient.findOne({
            attributes: ['uuid','name','lastname','telephone','email', 'address', 'sexe','dateNaiss', 'numSecuriteSoc'],
            where: {
                uuid: req.params.id
            }
        });

        res.status(200).json(response);

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const createFiche = async (req, res) => {
    const { name, lastname,telephone,email, address, sexe,dateNaiss, numSecuriteSoc} = req.body;
  
    try {
        await FichePatient.create({
            name: name,
            lastname:lastname, 
            telephone:telephone,
            email:email,
            address:address,
            sexe:sexe,
            dateNaiss:dateNaiss,
            numSecuriteSoc:numSecuriteSoc

        });
        res.status(201).json({ msg: "Fiche patient ajoutée avec succès" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const updateFiche = async(req, res) =>{
    const fiche = await FichePatient.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!fiche) return res.status(404).json({msg: "Fiche non trouvée"});
    // const {name, email, password, confPassword, role,lastname,address,telephone} = req.body;

    const {name, lastname,telephone,email, address, sexe,dateNaiss, numSecuriteSoc} = req.body;
   
    try {
        await FichePatient.update({
            name: name,
            lastname:lastname, 
            telephone:telephone,
            email:email,
            address:address,
            sexe:sexe,
            dateNaiss:dateNaiss,
            numSecuriteSoc:numSecuriteSoc
        },{
            where:{
                id: fiche.id
            }
        });
        res.status(200).json({msg: "Fiche mise à jour avec succès"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const deleteFiche = async(req, res) =>{
    const fiche = await FichePatient.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!fiche) return res.status(404).json({msg: "Fiche non trouvée"});
    try {
        await fiche.destroy({
            where:{
                id: fiche.id
            }
        });
        res.status(200).json({msg: "Fiche supprimée avec succès"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

// fichePatientController.js

export const getFicheById2 = async (req, res) => {
    const { id } = req.params;

    try {
        console.log('ID reçuuuuuuuuuu pour la recherche:', req.params.id); // Ajouter un log pour l'ID reçu
        const fiche = await FichePatient.findOne({
            where: {
                id: id // Assurez-vous que cet ID existe dans votre base de données
            }
        });

        if (!fiche) {
            console.warn(`Aucun patient trouvé pour l'ID: ${req.params.id}`);
            return res.status(404).json({ message: 'Patient not found' });
        }

        res.json(fiche);
    } catch (error) {
        console.error('Erreur lors de la récupération des détails du patient:', error);
        res.status(500).json({ message: 'Server error' });
    }
}
  