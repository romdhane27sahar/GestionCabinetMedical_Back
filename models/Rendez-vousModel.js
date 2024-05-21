import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const RendezVous = db.define('rendezVous', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        // primaryKey: true,
        validate: {
            notEmpty: true
        }
    },
    
    dateRendezVous: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    heureRendezVous: {
        type: DataTypes.TIME,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    fichePatientId: {
        type: DataTypes.INTEGER,
       
        references: {
            model: 'fichePatient',
            key: 'id'
        }
    },
    prochainRendezVousId: {
        type: DataTypes.INTEGER,
        allowNull:true,
        references: {
            model: 'prochainRendezVous',
            key: 'id'
        }
    }
}, {
    freezeTableName: true
});

export default RendezVous;
