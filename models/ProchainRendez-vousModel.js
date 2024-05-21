import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const ProchainRendezVous = db.define('prochainRendezVous', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
  
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        //primaryKey: true,
        validate: {
            notEmpty: true
        }
    },
    
    dateProchainRv: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    heureProchainRv: {
        type: DataTypes.TIME,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    fichePatientId: {
        type:DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'fichePatient',
            key: 'id'
        }
    }
}, {
    freezeTableName: true
});

export default ProchainRendezVous;
