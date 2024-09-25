import Riego from "../models/Riego.js"


const httpRiegos= {
    getRiegos: async (req,res) => {
        try {
            const riegos = await Riego.find()
            .populate("idcultivo")
            .populate("idempleado");
            res.json({ riegos });
        } catch (error) {
            res.status(500).json({ error: "Error al obtener los riegos" });
        }
    },
    getRiegosID: async (req, res) => {
        try {
            const { id } = req.params;
            const riego = await Riego.findById(id);
            if (!riego) {
                return res.status(404).json({ error: "Riego no encontrado" });
            }
            res.json({ riego });
        } catch (error) {
            res.status(500).json({ error: "Error al obtener el riego" });
        }
    },
  
    postRiego: async (req, res) => {
        try {
            const { idcultivo,idempleado, diasTransplante,fenologico,horaInicio,horaFin,dosis,cantidadAgua} = req.body;
            const nuevoRiego = new Riego({ idcultivo,idempleado, diasTransplante,fenologico,horaInicio,horaFin,dosis,cantidadAgua});
            await nuevoRiego.save();
            res.status(201).json({ nuevoRiego });
        } catch (error) {
            res.status(400).json({ error: "No se pudo crear el riego" });
            console.log(error);
        } 
    },
    putRiego: async (req, res) => {
        try {
            const { id } = req.params;
            const { idcultivo,idempleado, diasTransplante,fenologico,horaInicio,horaFin,dosis,cantidadAgua } = req.body;
            const riegoActualizado = await Riego.findByIdAndUpdate(id, { idcultivo,idempleado, diasTransplante,fenologico,horaInicio,horaFin,dosis,cantidadAgua }, { new: true });
            res.json({ riegoActualizado });
        } catch (error) {
            res.status(400).json({ error: "No se pudo actualizar el riego" });
        }
    },
   
    

  
};

export default httpRiegos;
