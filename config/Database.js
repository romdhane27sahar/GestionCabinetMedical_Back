import {Sequelize} from "sequelize";

const db = new Sequelize('pfa_db', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});

/**Sequelize, qui est un ORM (Object-Relational Mapping) pour Node.js, utilisé pour interagir avec une base de données relationnelle */

export default db;