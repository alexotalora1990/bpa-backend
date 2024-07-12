import jwt from "jsonwebtoken"
import Administrador from "../models/Administrador.js";

const generarJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: "4h"//4h
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject("No se pudo generar el token")
            } else {
                resolve(token)
            }
        })
    })

}

const validarJWT = async (req, res, next) => {
    const token = req.header("token");

    if (!token) {
        return res.status(401).json({
            msg: "No hay token en la peticion"
        })
    }

    try { 
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
console.log("uid: ",uid);
        let admin = await Administrador.findById({ _id: uid });

        if (!admin) {
            return res.status(401).json({
                msg: "Token no valido existencia"//- usuario no existe DB
            })
        }
        if (admin.estado == 0) {
            return res.status(401).json({
                msg: "Token no válido estado" //- usuario con estado: false
            })
        }

        req.admin=admin

        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: "Token no valido (last catch error)"
        })
    }
}


export { generarJWT, validarJWT }