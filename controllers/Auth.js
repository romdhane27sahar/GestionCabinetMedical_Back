import User from "../models/UserModel.js";
import argon2 from "argon2";

export const Login = async(req,res)=>{
    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    });
    if(!user) return res.status(404).json({msg: "User not found"});
    const match = await argon2.verify(user.password,req.body.password);
    if (!match) return res.status(401).json({msg:'Password incorrect'});
    req.session.userId =  user.uuid;  /**Cette ligne attribue l'identifiant unique de l'utilisateur (user.uuid) à la session de l'utilisateur. Cela permet de suivre l'état de l'authentification de l'utilisateur entre les requêtes. */
    const uuid = user.uuid;
    const name = user.name;
    const email =user.email;
    const role =user.role;
    

    res.status(200).json({uuid,name,email,role});
}
 
//fonction pour recuperer le user connecté ()
export const Me = async (req, res) =>{
    if(!req.session.userId){ /**si pas d'identifiant de session <=>no session , send message :login to your account */
        return res.status(401).json({msg: "please login to your account !"});/** la fonction retourne une réponse JSON avec un statut 401 (Unauthorized) et un message indiquant à l'utilisateur de se connecter à son compte.*/
    }
    const user = await User.findOne({ /**Si un identifiant de session est présent dans la demande, la fonction recherche l'utilisateur correspondant dans la base de données en utilisant cet identifiant de session. Cela implique de rechercher un utilisateur dont l'identifiant UUID correspond à req.session.userId */
        attributes:['uuid','name','email','role'],
        where: {
            uuid: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "User not found"});/**Si aucun utilisateur n'est trouvé, cela signifie généralement qu'il y a un problème avec l'identifiant de session ou que l'utilisateur associé à cet identifiant de session n'existe plus dans la base de données. Dans ce cas, la fonction retourne une réponse JSON avec un statut 404 (Not Found) et un message indiquant que l'utilisateur n'a pas été trouvé. */
    res.status(200).json(user);/** la fonction retourne une réponse JSON avec un statut 200 (OK) contenant les informations de l'utilisateur. Ces informations incluent généralement l'UUID, le nom, l'e-mail et le rôle de l'utilisateur. */
}



export const logOut=(req,res)=>{
        req.session.destroy((err)=>{
            if(err)return res.status(400).json({msg:"can't log out "});
            res.status(200).json({msg:"you have logged out  successfully "})
        });
    }
