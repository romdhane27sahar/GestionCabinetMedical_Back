import {Sequelize}from"sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Users = db.define('users',{
    uuid:{ /**UUID signifie "Universally Unique Identifier" (Identifiant Universel Unique). C'est un identifiant standardisé et universellement unique, souvent utilisé dans les logiciels et les systèmes informatiques pour identifier de manière unique des entités telles que des utilisateurs, des objets, des transactions, etc. */
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{ /**spécifie les contraintes de validation pour la colonne.  */
            notEmpty: true
        }
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 100]
        }
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            isEmail: true
        }
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    role:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    }, 


    lastname:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 100]
        }
    },
    address:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [5, 100]
        }
    },
    telephone:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [8, 100]
        }
    }
},{
    /**Cette option spécifie que le nom de la table dans la base de données doit être le même que le nom défini dans le modèle.  */
    freezeTableName: true
}, {
    validate(values) {
      // Validation supplémentaire au niveau du modèle
      // ...
  
      // Vérification du champ `name`
      if ( values.name.length < 3 || values.name.length > 100) {
        throw new Error('Le nom doit avoir une longueur entre 3 et 100 caractères');
      }
  
      // Vérification du champ `email`
      if ( !isEmail(values.email)) {
        throw new Error('Adresse e-mail invalide');
      }
  
      // ... (vérification des autres champs) ...
    }
  });


export default Users;