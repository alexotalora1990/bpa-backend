import Administrador from "../models/Administrador.js";
import bcryptjs from "bcryptjs";
import { generarJWT } from "../middleware/validar-jwts.js";


const httpsAdmin = {
    getAdmin: async (req, res) => {
        const { busqueda } = req.query
        const administrador = await Administrador.find(
            {
                $or: [
                    { nombre: new RegExp(busqueda, "i") }
                ]
            }
        )
        console.log(administrador);
        res.json({ administrador })
    },
    getAdminID: async (req, res) => {
        const { id } = req.params
        const administradores = await Administrador.findById(id)
        res.json({ administradores })
    },
    getAdminActivos: async (req, res) => {
        const Administradores = await Administrador.find({estado: 1})
        res.json({ Administradores })
    },
    getAdminInactivos: async (req, res) => {
        const Administradores = await Administrador.find({estado: 0})
        res.json({ Administradores })
    },
    postAdmin: async (req, res) => {
        try {
            const {nombre,direccion,correo,contrasena,telefono,municipio, rol} = req.body;
            const admin = new Administrador({nombre,direccion,correo,contrasena,telefono,municipio, rol})
            const salt = bcryptjs.genSaltSync();
            admin.contrasena = bcryptjs.hashSync(contrasena, salt)
            await admin.save()
            console.log(admin);
            res.json({ message: "Admin creado satisfactoriamente", admin });
        } catch (error){
            console.log(error);
            res.status(400).json({ err: "No se pudo crear este Admin" })
        }
    },
    putAdmin: async (req, res) => {
        try {
            const { id } = req.params;
            const { correo, ...resto } = req.body;
            const admin = await Administrador.findByIdAndUpdate(id, resto, { new: true });
            res.json({ admin });
        } catch (error) {
            res.status(400).json({ error: "No se pudo actualizar el admin" });
        }
    },
    putAdminActivar: async (req, res) => {
        const { id } = req.params
        const administrador = await Administrador.findByIdAndUpdate(id, { estado: 1 }, { new: true })
        res.json({ administrador })
    },
    putAdminDesactivar: async (req, res) => {
        const { id } = req.params
        const administrador = await Administrador.findByIdAndUpdate(id, { estado: 0 }, { new: true })
        res.json({ administrador })
    },
    login: async (req, res) => {
        const { correo, contrasena } = req.body;


        try {
            const admin = await Administrador.findOne({ correo })
            if (!admin) {
                return res.status(401).json({
                    // msg: "Usuario / Password no son correctos+"
                    msg: "correo no es correcto"
                })
            }

            const validPassword = bcryptjs.compareSync(contrasena, admin.contrasena);
            if (!validPassword) {
                return res.status(401).json({
                    // msg: "Usuario / Password no son correctos"
                    msg: "contrasena no es correcto"
                })
            }

            const token = await generarJWT(admin._id);
            res.json({
                admin,
                token
            })

        } catch (error) {
            console.log(error);
            return res.status(500).json({

                msg: "Hable con el WebMaster"
            })
        }
    },
}

export default httpsAdmin