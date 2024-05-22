import RendezVous from "../models/Rendez-vousModel.js";
import FichePatient from "../models/FichePatientModel.js"

export const getStatistics = async (req, res) => {
  try {
    const rendezVousCount = await RendezVous.count();
    const fichesPatientsCount = await FichePatient.count();

    res.json({ rendezVousCount, fichesPatientsCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des statistiques.' });
  }
};
