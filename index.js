import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import UserRoute from "./routes/UserRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import SequelizeStore from "connect-session-sequelize";

import FichePatient from "./models/FichePatientModel.js";
import RendezVous from "./models/Rendez-vousModel.js";
import ProchainRendezVous from "./models/ProchainRendez-vousModel.js";

import FichePatientRoute from "./routes/FichePatientRoute.js";
import RendezVousRoute from "./routes/RendezVousRoute.js";
import ProchainRvRoute from "./routes/ProchainRvRoute.js";



//related to reset password
//import nodemailer from "nodemailer"



dotenv.config();
const app = express();/** crée une instance d'application Express. Express est un framework web pour Node.js qui simplifie la création d'applications web et d'API en fournissant des fonctionnalités pour gérer les requêtes HTTP, les routes, les middlewares, etc */

const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({ /** crée une instance de Sequelize Store en passant la connexion à la base de données Sequelize comme paramètre */
    db :db
});


// Relations
FichePatient.hasMany(RendezVous, { foreignKey: 'fichePatientId' });
FichePatient.hasMany(ProchainRendezVous, { foreignKey: 'fichePatientId' });

RendezVous.belongsTo(FichePatient, { foreignKey: 'fichePatientId' });
ProchainRendezVous.belongsTo(FichePatient, { foreignKey: 'fichePatientId' });


RendezVous.belongsTo(ProchainRendezVous, { foreignKey: 'prochainRendezVousId' });
//ProchainRendezVous.belongsTo(RendezVous, { foreignKey: 'rendezVousId' });
ProchainRendezVous.hasOne(RendezVous, { foreignKey: 'prochainRendezVousId' });
//RendezVous.hasOne(ProchainRendezVous, { foreignKey: 'rendezVousId' });



/**Créer la bd et ses tables pour la 1ere fois eouis on l'a désactivé */
(async()=>{
    await db.sync();
    await FichePatient.sync(); 
    await RendezVous.sync(); 
    await ProchainRendezVous.sync(); 


})();


app.use(session({
    secret: process.env.SESS_SECRET, /**utilisée pour signer les cookies de session. Il est utilisé pour garantir l'intégrité des données stockées dans la session et pour empêcher la falsification des cookies de session par des tiers */
    resave: false,/**contrôle si la session doit être enregistrée dans le magasin de sessions, même si elle n'a pas été modifiée pendant la requête. Dans ce cas, il est défini sur false, ce qui signifie que la session ne sera pas enregistrée à moins qu'elle n'ait été modifiée. */
    saveUninitialized: true,/** indique si une session non initialisée doit être enregistrée dans le magasin de sessions. Si elle est définie sur true, une session sera enregistrée même si elle n'a pas été modifiée. */
    store:store,/**C'est l'endroit où les données de session seront stockées */
    
    cookie: { /**Cet objet définit les options du cookie de session. Dans cet exemple, l'option secure est définie sur 'auto'. Cela signifie que le cookie de session sera sécurisé si la connexion est sécurisée (HTTPS), sinon il sera envoyé via une connexion non sécurisée (HTTP). */
        secure: 'auto'
    }
}));
/**===> utiliser le middleware de gestion des sessions dans une application Express en Node.js. */
/**ajoute le middleware de session à l'application Express. Le middleware de session est utilisé pour gérer les sessions des utilisateurs, ce qui permet de stocker des données de session entre les requêtes HTTP. */

app.use(cors({
    credentials :true, /**indique que les cookies et les en-têtes d'autorisation doivent être inclus dans les requêtes CORS. Cela signifie que les demandes de ce domaine spécifique (http://localhost:3000 dans ce cas) peuvent inclure des informations d'authentification, telles que les cookies de session. */
    origin:'http://localhost:3000'/**spécifie le domaine autorisé à effectuer des requêtes CORS. Dans cet exemple, seules les requêtes provenant du domaine http://localhost:3000 seront autorisées. Si une demande provient d'un autre domaine, elle sera refusée par défaut en raison de la politique Same-Origin. */
}));
/** le middleware CORS (Cross-Origin Resource Sharing) dans une application Express en Node.js.

Lorsqu'une application web fait une requête à un serveur, 
le navigateur peut appliquer une politique de sécurité appelée Same-Origin Policy. 
Cette politique empêche les requêtes entre différents domaines à moins qu'ils n'aient explicitement autorisé ces requêtes. CORS est un mécanisme qui permet à un serveur de déclarer quels domaines sont autorisés à accéder à ses ressources. 
ce code permet à l'application Express d'autoriser les requêtes CORS en provenance du domaine http://localhost:3000, et de partager les informations d'authentification (si disponibles) avec ce domaine*/


app.use(express.json());/** Ce middleware est utilisé pour analyser le corps des requêtes HTTP entrantes avec un type MIME de application/json. Il permet à votre application Express de comprendre et de traiter les données JSON envoyées dans le corps des requêtes */
app.use(UserRoute);/** l'utilisation d'un routeur personnalisé appelé UserRoute. Les routeurs en Express sont des instances d'objets Router qui vous permettent de regrouper des routes et des middlewares associés. Le routeur UserRoute est probablement responsable de la gestion des routes liées aux utilisateurs dans votre application, telles que la création, la récupération, la mise à jour et la suppression d'utilisateurs. */
app.use(AuthRoute);
app.use(FichePatientRoute);
app.use(RendezVousRoute);
app.use(ProchainRvRoute);




// store.sync();

//related to reset password
// app.use(express.json({ limit: "25mb" }));
// app.use(express.urlencoded({ limit: "25mb" }));

// function sendEmail({recipient_email,OTP}) {
//     return new Promise((resolve, reject) => {
//       var transporter = nodemailer.createTransport({
//         service: "gmail",
//         auth: {
//           user: process.env.MY_EMAIL,
//           pass: process.env.MY_PASSWORD,
//         },
//       });
  
//       const mail_configs = {
//         from: process.env.MY_EMAIL,
//         to: recipient_email,
//         subject: "KODING 101 PASSWORD RECOVERY",
//         html: `<!DOCTYPE html>
//   <html lang="en" >
//   <head>
//     <meta charset="UTF-8">
//     <title>CodePen - OTP Email Template</title>
    
  
//   </head>
//   <body>
//   <!-- partial:index.partial.html -->
//   <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
//     <div style="margin:50px auto;width:70%;padding:20px 0">
//       <div style="border-bottom:1px solid #eee">
//         <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Koding 101</a>
//       </div>
//       <p style="font-size:1.1em">Hi,</p>
//       <p>Thank you for choosing Koding 101. Use the following OTP to complete your Password Recovery Procedure. OTP is valid for 5 minutes</p>
//       <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
//       <p style="font-size:0.9em;">Regards,<br />Koding 101</p>
//       <hr style="border:none;border-top:1px solid #eee" />
//       <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
//         <p>Koding 101 Inc</p>
//         <p>1600 Amphitheatre Parkway</p>
//         <p>California</p>
//       </div>
//     </div>
//   </div>
//   <!-- partial -->
    
//   </body>
//   </html>`,
//       };
//       transporter.sendMail(mail_configs, function (error, info) {
//         if (error) {
//           console.log(error);
//           return reject({ message: `An error has occured` });
//         }
//         return resolve({ message: "Email sent succesfuly" });
//       });
//     });
//   }

//   app.get("/", (req, res) => {
//     console.log(process.env.MY_EMAIL);
//   });

//   app.post("/send_recovery_email", (req, res) => {
//     sendEmail(req.body)
//       .then((response) => res.send(response.message))
//       .catch((error) => res.status(500).send(error.message));
//   });


/**démarrer le serveur Express et le met en écoute sur un port spécifié dans la variable d'environnement APP_PORT. */
app.listen(process.env.APP_PORT , ()=>{
    console.log('Server up and running ...');

})