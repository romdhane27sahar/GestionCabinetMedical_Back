import User from "../models/UserModel.js"
import argon2 from "argon2"

export const getUsers = async (req, res) => {
    try {
        const response = await User.findAll({
            attributes: ['uuid', 'name', 'email', 'role','lastname','address','telephone']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getUserById = async (req, res) => {
    try {
        const response = await User.findOne({
            attributes: ['uuid', 'name', 'email', 'role','lastname','address','telephone'],
            where: {
                uuid: req.params.id
            }
        });

        res.status(200).json(response);

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const createUser = async (req, res) => {
    const { name, email, password, confPassword, role,lastname,address,telephone} = req.body;
    if (password !== confPassword) return res.satus(400).json({ msg: "Mot de passe et confirm mot de passe ne sont pas compatibles " })

    // if (!password || typeof password !== 'string') {
    //     return res.status(400).json({ msg: 'Invalid password provided' });
    //   }    
    const hashPassword = await argon2.hash(password);
    try {
        await User.create({
            name: name,
            email: email,
            password: hashPassword,
            role: role,
            lastname:lastname,
            address:address,
            telephone:telephone

        });
        res.status(201).json({ msg: "Register successful" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const updateUser = async(req, res) =>{
    const user = await User.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!user) return res.status(404).json({msg: "User not found"});
    // const {name, email, password, confPassword, role,lastname,address,telephone} = req.body;

    const {name, email, password,  role,lastname,address,telephone} = req.body;
    let hashPassword;
    if(password === "" || password === null){
        hashPassword = user.password
    }else{
        hashPassword = await argon2.hash(password);
    }
    // if(password !== confPassword) return res.status(400).json({msg: "Mot de passe et confirm mot de passe ne sont pas compatibles"});
    try {
        await User.update({
            name: name,
            email: email,
            password: hashPassword,
            role: role,
            lastname:lastname,
            address:address,
            telephone:telephone

        },{
            where:{
                id: user.id
            }
        });
        res.status(200).json({msg: "User Updated"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const deleteUser = async(req, res) =>{
    const user = await User.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!user) return res.status(404).json({msg: "User not found"});
    try {
        await User.destroy({
            where:{
                id: user.id
            }
        });
        res.status(200).json({msg: "User Deleted"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}
